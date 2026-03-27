require("dotenv").config({ quiet: true });

const Stripe = require("stripe");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

if (!stripeSecretKey) {
  console.error("Missing STRIPE_SECRET_KEY in .env");
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);

const planDefinitions = [
  {
    envKey: "STRIPE_PERSONAL_PRICE_ID",
    lookupKey: "lingolearn_personal_monthly",
    productName: "LingoLearn Personal",
    description: "Personal language learning subscription",
    unitAmount: 399,
  },
  {
    envKey: "STRIPE_STUDENT_PRICE_ID",
    lookupKey: "lingolearn_student_monthly",
    productName: "LingoLearn Student",
    description: "Student subscription for individual learners",
    unitAmount: 399,
  },
  {
    envKey: "STRIPE_TEACHER_PRICE_ID",
    lookupKey: "lingolearn_teacher_seat_monthly",
    productName: "LingoLearn Teacher Seats",
    description: "Teacher subscription billed per student seat",
    unitAmount: 299,
  },
];

async function findPriceByLookupKey(lookupKey) {
  const prices = await stripe.prices.list({ active: true, limit: 100 });
  return prices.data.find((price) => price.lookup_key === lookupKey) || null;
}

async function findOrCreateProduct(productName, description) {
  const products = await stripe.products.list({ active: true, limit: 100 });
  const existing = products.data.find((product) => product.name === productName);

  if (existing) {
    return existing;
  }

  return stripe.products.create({
    name: productName,
    description,
  });
}

async function findOrCreatePrice(plan) {
  const existingPrice = await findPriceByLookupKey(plan.lookupKey);
  if (existingPrice) {
    return existingPrice;
  }

  const product = await findOrCreateProduct(plan.productName, plan.description);

  return stripe.prices.create({
    product: product.id,
    currency: "gbp",
    unit_amount: plan.unitAmount,
    recurring: {
      interval: "month",
    },
    lookup_key: plan.lookupKey,
    nickname: plan.productName,
    metadata: {
      app: "LingoLearn",
      plan: plan.envKey,
    },
  });
}

async function main() {
  const results = [];

  for (const plan of planDefinitions) {
    const price = await findOrCreatePrice(plan);
    results.push({
      envKey: plan.envKey,
      priceId: price.id,
      lookupKey: plan.lookupKey,
    });
  }

  console.log("Stripe products and prices are ready:");
  results.forEach((item) => {
    console.log(`${item.envKey}=${item.priceId}  # ${item.lookupKey}`);
  });
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
