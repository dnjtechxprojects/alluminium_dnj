import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: [
      { level: "warn", emit: "event" },
      { level: "info", emit: "event" },
      { level: "error", emit: "event" },
    ],
    errorFormat: "pretty",
  });

  client.$on("warn", (e: any) => {
    // console.log("Warning =-=>", e);
  });

  client.$on("info", (e: any) => {
    // console.log("Info =-=>", e);
  });

  client.$on("error", (e: any) => {
    console.log("Error =-=>", e);
  });

  return client;
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
