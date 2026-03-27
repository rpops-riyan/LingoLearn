const fs = require("fs");
const path = require("path");

const storePath = process.env.BILLING_STORE_PATH
  ? path.resolve(process.env.BILLING_STORE_PATH)
  : path.join(__dirname, "..", "data", "billing-store.json");

const defaultStore = {
  customers: {},
};

function ensureStore() {
  const directory = path.dirname(storePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, `${JSON.stringify(defaultStore, null, 2)}\n`, "utf8");
  }
}

function readStore() {
  ensureStore();

  try {
    return JSON.parse(fs.readFileSync(storePath, "utf8"));
  } catch (error) {
    return { ...defaultStore };
  }
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function getCustomerByEmail(email) {
  const store = readStore();
  return store.customers[normalizeEmail(email)] || null;
}

function upsertCustomer(email, updates) {
  const store = readStore();
  const emailKey = normalizeEmail(email);
  const existing = store.customers[emailKey] || {
    email: emailKey,
    createdAt: new Date().toISOString(),
  };

  store.customers[emailKey] = {
    ...existing,
    ...updates,
    email: emailKey,
    updatedAt: new Date().toISOString(),
  };

  writeStore(store);
  return store.customers[emailKey];
}

function findCustomerByStripeCustomerId(stripeCustomerId) {
  const store = readStore();

  return (
    Object.values(store.customers).find((customer) => customer.stripeCustomerId === stripeCustomerId) || null
  );
}

module.exports = {
  getCustomerByEmail,
  upsertCustomer,
  findCustomerByStripeCustomerId,
  normalizeEmail,
};
