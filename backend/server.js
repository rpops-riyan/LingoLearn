require("dotenv").config({ quiet: true });

const express = require("express");
const Stripe = require("stripe");

const {
  getCustomerByEmail,
  upsertCustomer,
  findCustomerByStripeCustomerId,
  normalizeEmail,
} = require("./lib/billing-store");

const app = express();
const port = Number(process.env.PORT || 4242);
const stripeSecretKey = String(process.env.STRIPE_SECRET_KEY || "").trim();
const stripeWebhookSecret = String(process.env.STRIPE_WEBHOOK_SECRET || "").trim();
const jsonParser = express.json();
const railwayPublicDomain = String(process.env.RAILWAY_PUBLIC_DOMAIN || "").trim();
const configuredPublicServerUrl = String(process.env.PUBLIC_SERVER_URL || "").trim();
const publicServerUrl =
  configuredPublicServerUrl ||
  (railwayPublicDomain ? `https://${railwayPublicDomain}` : "") ||
  `http://localhost:${port}`;

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

function getMissingStripeConfig() {
  return [
    stripe ? null : "STRIPE_SECRET_KEY",
    process.env.STRIPE_PERSONAL_PRICE_ID ? null : "STRIPE_PERSONAL_PRICE_ID",
    process.env.STRIPE_STUDENT_PRICE_ID ? null : "STRIPE_STUDENT_PRICE_ID",
    process.env.STRIPE_TEACHER_PRICE_ID ? null : "STRIPE_TEACHER_PRICE_ID",
  ].filter(Boolean);
}

function hasStripeConfig() {
  return getMissingStripeConfig().length === 0;
}

function getPriceIdForRole(role) {
  if (role === "teacher") {
    return process.env.STRIPE_TEACHER_PRICE_ID;
  }

  if (role === "student") {
    return process.env.STRIPE_STUDENT_PRICE_ID;
  }

  return process.env.STRIPE_PERSONAL_PRICE_ID || process.env.STRIPE_STUDENT_PRICE_ID;
}

function isSubscriptionActive(status) {
  return ["active", "trialing"].includes(status);
}

function billingHtml(title, message) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: Avenir Next, Trebuchet MS, sans-serif;
            background: linear-gradient(145deg, #dff9ea 0%, #c4efd7 48%, #effff6 100%);
            color: #173126;
          }

          main {
            max-width: 560px;
            padding: 2rem;
            border-radius: 28px;
            background: rgba(255, 255, 255, 0.92);
            box-shadow: 0 20px 50px rgba(27, 77, 55, 0.12);
            text-align: center;
          }

          a {
            color: #1f6d4e;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>${title}</h1>
          <p>${message}</p>
          <p>Return to the app and press <strong>Refresh billing status</strong>.</p>
        </main>
      </body>
    </html>
  `;
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Stripe-Signature");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    stripeConfigured: hasStripeConfig(),
    missingStripeConfig: getMissingStripeConfig(),
    publicServerUrl,
  });
});

app.get("/api/subscription-status", (req, res) => {
  const email = normalizeEmail(req.query.email);

  if (!email) {
    res.status(400).json({ error: "Email is required." });
    return;
  }

  const customer = getCustomerByEmail(email);

  res.json({
    email,
    knownCustomer: Boolean(customer),
    active: Boolean(customer && isSubscriptionActive(customer.subscriptionStatus)),
    role: customer?.role || "personal",
    quantity: customer?.quantity || 1,
    subscriptionStatus: customer?.subscriptionStatus || "inactive",
    stripeCustomerId: customer?.stripeCustomerId || null,
  });
});

app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
    return;
  }

  jsonParser(req, res, next);
});

app.post("/api/create-checkout-session", async (req, res) => {
  if (!hasStripeConfig()) {
    res.status(500).json({
      error: "Stripe is not configured yet. Add your keys and price IDs to .env first.",
    });
    return;
  }

  const email = normalizeEmail(req.body.email);
  const name = String(req.body.name || "").trim();
  const role =
    req.body.role === "teacher"
      ? "teacher"
      : req.body.role === "student"
        ? "student"
        : "personal";
  const quantity = role === "teacher" ? Math.max(1, Number(req.body.quantity || 1)) : 1;

  if (!email) {
    res.status(400).json({ error: "Email is required." });
    return;
  }

  try {
    let customer = getCustomerByEmail(email);
    let stripeCustomerId = customer?.stripeCustomerId;

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email,
        name,
        metadata: {
          app: "LingoLearn",
        },
      });

      stripeCustomerId = stripeCustomer.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [
        {
          price: getPriceIdForRole(role),
          quantity,
        },
      ],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      success_url: `${publicServerUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${publicServerUrl}/checkout/cancel`,
      metadata: {
        email,
        role,
        quantity: String(quantity),
        source: "electron",
      },
      subscription_data: {
        metadata: {
          email,
          role,
          quantity: String(quantity),
          source: "electron",
        },
      },
    });

    customer = upsertCustomer(email, {
      email,
      name,
      role,
      quantity,
      stripeCustomerId,
      checkoutSessionId: session.id,
      subscriptionStatus: customer?.subscriptionStatus || "pending_checkout",
    });

    res.json({
      url: session.url,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unable to create a checkout session.",
    });
  }
});

app.post("/api/create-customer-portal", async (req, res) => {
  if (!hasStripeConfig()) {
    res.status(500).json({
      error: "Stripe is not configured yet. Add your keys and price IDs to .env first.",
    });
    return;
  }

  const email = normalizeEmail(req.body.email);

  if (!email) {
    res.status(400).json({ error: "Email is required." });
    return;
  }

  const customer = getCustomerByEmail(email);

  if (!customer?.stripeCustomerId) {
    res.status(404).json({
      error: "No Stripe customer was found for this email yet. Complete checkout first.",
    });
    return;
  }

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${publicServerUrl}/portal/return`,
    });

    res.json({ url: portalSession.url });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unable to open the billing portal.",
    });
  }
});

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    if (!stripe) {
      res.status(500).send("Stripe is not configured.");
      return;
    }

    let event;

    try {
      event = stripeWebhookSecret
        ? stripe.webhooks.constructEvent(
            req.body,
            req.headers["stripe-signature"],
            stripeWebhookSecret
          )
        : JSON.parse(req.body.toString("utf8"));
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const email =
            normalizeEmail(session.metadata?.email) ||
            normalizeEmail(session.customer_details?.email);

          if (email) {
            const subscription = session.subscription
              ? await stripe.subscriptions.retrieve(session.subscription)
              : null;

            upsertCustomer(email, {
              stripeCustomerId: session.customer || null,
              checkoutSessionId: session.id,
              subscriptionId: session.subscription || null,
              subscriptionStatus: subscription?.status || "completed",
              role: session.metadata?.role || "personal",
              quantity: Number(session.metadata?.quantity || 1),
              currentPeriodEnd: subscription?.current_period_end || null,
            });
          }
          break;
        }

        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object;
          const customer =
            findCustomerByStripeCustomerId(subscription.customer) ||
            (subscription.metadata?.email
              ? getCustomerByEmail(subscription.metadata.email)
              : null);

          if (customer?.email) {
            upsertCustomer(customer.email, {
              stripeCustomerId: subscription.customer,
              subscriptionId: subscription.id,
              subscriptionStatus: subscription.status,
              role: subscription.metadata?.role || customer.role || "personal",
              quantity: Number(subscription.metadata?.quantity || customer.quantity || 1),
              currentPeriodEnd: subscription.current_period_end || null,
            });
          }
          break;
        }

        default:
          break;
      }

      res.json({ received: true });
    } catch (error) {
      res.status(500).send(`Webhook handler error: ${error.message}`);
    }
  }
);

app.get("/checkout/success", (_req, res) => {
  res.send(
    billingHtml(
      "Payment complete",
      "Your Stripe checkout finished successfully."
    )
  );
});

app.get("/checkout/cancel", (_req, res) => {
  res.send(
    billingHtml(
      "Checkout cancelled",
      "No payment was completed this time. You can return to the app and try again whenever you are ready."
    )
  );
});

app.get("/portal/return", (_req, res) => {
  res.send(
    billingHtml(
      "Billing portal closed",
      "Your billing changes were saved in Stripe. Return to the app and refresh billing status if needed."
    )
  );
});

app.listen(port, () => {
  console.log(`LingoLearn billing backend listening on ${publicServerUrl}`);
});
