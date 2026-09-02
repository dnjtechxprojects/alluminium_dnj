// Imports legacy PRODUCT rows only.
//
// User rows are deliberately NOT imported: old-data.json carried a plaintext
// password, and re-running this would have overwritten a hashed password with
// that plaintext value. Admin accounts are managed solely by
// scripts/create-admin.cjs.
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const dataPath = path.join(__dirname, "old-data.json");
const envPath = path.join(projectRoot, ".env");
const productPages = new Set([
  "DIEMANUFACTURING",
  "EXTRUDEDPRODUCTS",
  "FABRICATION",
  "NEWALLOY",
]);

function requiredString(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} must be a non-empty string`);
  }

  return value;
}

function requiredDate(value, field) {
  const dateValue = requiredString(value, field);
  const hasTimezone = /(?:Z|[+-]\d{2}:\d{2})$/i.test(dateValue);
  const date = new Date(hasTimezone ? dateValue : `${dateValue}Z`);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${field} must be a valid date`);
  }

  return date;
}

function readOldData() {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  if (!Array.isArray(data.Product)) {
    throw new Error('old-data.json must contain a "Product" array');
  }

  const products = data.Product.map((product, index) => {
    const page = requiredString(product.page, `Product[${index}].page`);

    if (!productPages.has(page)) {
      throw new Error(`Product[${index}].page has an unsupported value: ${page}`);
    }

    return {
      id: requiredString(product.id, `Product[${index}].id`),
      title: requiredString(product.title, `Product[${index}].title`),
      slug: requiredString(product.slug, `Product[${index}].slug`),
      description: requiredString(
        product.description,
        `Product[${index}].description`,
      ),
      image: requiredString(product.image, `Product[${index}].image`),
      page,
      createdAt: requiredDate(product.createdAt, `Product[${index}].createdAt`),
    };
  });

  return { products };
}

async function main() {
  const { products } = readOldData();

  if (process.argv.includes("--dry-run")) {
    console.log(`Validated ${products.length} product(s).`);
    return;
  }

  try {
    process.loadEnvFile(envPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Missing environment file: ${envPath}`);
    }

    throw error;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(`DATABASE_URL is missing from ${envPath}`);
  }

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  try {
    await prisma.$transaction(async (transaction) => {
      for (const product of products) {
        const { id, ...values } = product;

        await transaction.product.upsert({
          where: { id },
          create: product,
          update: values,
        });
      }
    });

    console.log(`Imported ${products.length} product(s).`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Old data import failed:", error.message);
  process.exitCode = 1;
});
