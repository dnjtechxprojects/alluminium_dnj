/**
 * Manage admin accounts.
 *
 *   node scripts/create-admin.cjs <username> [password]
 *       Create the user, or reset their password. Generates a strong
 *       password when one is not supplied.
 *
 *   node scripts/create-admin.cjs --remove <username>
 *       Delete the user.
 *
 *   node scripts/create-admin.cjs --replace <oldUsername> <newUsername> [password]
 *       Create the new user and delete the old one, in a single transaction.
 *
 *   node scripts/create-admin.cjs --list
 *       List accounts and whether each password is hashed.
 *
 * Registration through the API requires an already-authenticated admin, so
 * this is how the first account is created.
 */
const path = require("node:path");
const { randomBytes, scrypt } = require("node:crypto");
const { promisify } = require("node:util");

const scryptAsync = promisify(scrypt);

const MIN_PASSWORD_LENGTH = 16;

// Ambiguous characters (O/0, l/1/I) left out so the password can be read aloud
// or retyped without confusion.
const ALPHABET = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789-_=+";

function generatePassword(length = 28) {
  // Rejection sampling keeps every character equally likely.
  const max = 256 - (256 % ALPHABET.length);
  let out = "";

  while (out.length < length) {
    for (const byte of randomBytes(length)) {
      if (byte >= max) continue;
      out += ALPHABET[byte % ALPHABET.length];
      if (out.length === length) break;
    }
  }

  return out;
}

async function hashPassword(plain) {
  const salt = randomBytes(16);
  const derived = await scryptAsync(plain, salt, 64);
  return `scrypt:${salt.toString("hex")}:${derived.toString("hex")}`;
}

function loadEnv() {
  const envPath = path.resolve(__dirname, "..", ".env");
  try {
    process.loadEnvFile(envPath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    throw new Error(
      "Usage:\n" +
        "  node scripts/create-admin.cjs <username> [password]\n" +
        "  node scripts/create-admin.cjs --remove <username>\n" +
        "  node scripts/create-admin.cjs --replace <oldUsername> <newUsername> [password]\n" +
        "  node scripts/create-admin.cjs --list",
    );
  }

  loadEnv();

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  try {
    const [command] = args;

    if (command === "--list") {
      const users = await prisma.user.findMany({
        select: { username: true, password: true, createdAt: true },
        orderBy: { createdAt: "asc" },
      });

      if (users.length === 0) {
        console.log("No accounts.");
        return;
      }

      console.log(`${users.length} account(s):`);
      for (const user of users) {
        console.log(`  ${user.username}  —  ${user.password}`);
      }
      return;
    }

    if (command === "--remove") {
      const [, username] = args;
      if (!username) throw new Error("--remove needs a username");

      const remaining = await prisma.user.count({
        where: { username: { not: username } },
      });

      if (remaining === 0) {
        throw new Error(
          `Refusing to delete "${username}": it is the only account left. ` +
            "Create the replacement first, or use --replace.",
        );
      }

      const { count } = await prisma.user.deleteMany({ where: { username } });
      console.log(
        count > 0 ? `Removed ${username}.` : `No account named ${username}.`,
      );
      return;
    }

    if (command === "--replace") {
      const [, oldUsername, newUsername, suppliedPassword] = args;

      if (!oldUsername || !newUsername) {
        throw new Error("--replace needs <oldUsername> <newUsername>");
      }
      if (oldUsername === newUsername) {
        throw new Error("Old and new usernames are the same — use the plain form to reset a password");
      }

      const password = suppliedPassword || generatePassword();
      if (password.length < MIN_PASSWORD_LENGTH) {
        throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      }

      const hashed = await hashPassword(password);

      // Create first, delete second, so a failure never leaves zero accounts.
      const [created] = await prisma.$transaction([
        prisma.user.upsert({
          where: { username: newUsername },
          update: { password: hashed },
          create: { username: newUsername, password: hashed },
        }),
        prisma.user.deleteMany({ where: { username: oldUsername } }),
      ]);

      console.log(`Created admin:  ${created.username}`);
      console.log(`Removed admin:  ${oldUsername}`);
      if (!suppliedPassword) {
        console.log(`\nGenerated password (store it in a password manager now —\nit is not recoverable, only resettable):\n\n  ${password}\n`);
      }
      return;
    }

    // Default: create or reset one account.
    const [username, suppliedPassword] = args;
    const password = suppliedPassword || generatePassword();

    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.upsert({
      where: { username },
      update: { password: hashed },
      create: { username, password: hashed },
    });

    console.log(`Admin account ready: ${user.username}`);
    if (!suppliedPassword) {
      console.log(`\nGenerated password (store it in a password manager now —\nit is not recoverable, only resettable):\n\n  ${password}\n`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
