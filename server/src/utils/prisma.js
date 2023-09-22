const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});
module.exports = prisma;
