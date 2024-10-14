import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  // This defines the correct order for deletion
  const deleteOrder = [
    "sales.json", // Sales must be deleted first due to the foreign key constraint
    "purchases.json", // Purchases must be deleted before Products
    "expenseSummary.json",
    "expenses.json",
    "expenseByCategory.json",
    "users.json",
    "products.json", // Products last
    "salesSummary.json",
    "purchaseSummary.json"
  ];

  for (const fileName of deleteOrder) {
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName.charAt(0).toUpperCase() + modelName.slice(1) as keyof typeof prisma];

    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName.charAt(0).toUpperCase() + modelName.slice(1)}`);
    } else {
      console.error(`Model ${modelName} not found. Please ensure the model name is correctly specified.`);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Ordered to reflect the dependency hierarchy
  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName.charAt(0).toUpperCase() + modelName.slice(1) as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName.charAt(0).toUpperCase() + modelName.slice(1)} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
