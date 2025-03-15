import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.interpreter.createMany({
    data: [
      { name: "Alice", email: "alice@example.com", password: "1234" },
      { name: "Bob", email: "bob@example.com", password: "5678" },
    ],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
