/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `Purchases` table. All the data in the column will be lost.
  - The primary key for the `SalesSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SalesSummary` table. All the data in the column will be lost.
  - Added the required column `totalCost` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitCost` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesSummaryId` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ExpenseByCategory_expenseSummaryId_key";

-- AlterTable
ALTER TABLE "Purchases" DROP COLUMN "totalAmount",
DROP COLUMN "unitPrice",
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unitCost" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "SalesSummary" DROP CONSTRAINT "SalesSummary_pkey",
DROP COLUMN "id",
ADD COLUMN     "salesSummaryId" TEXT NOT NULL,
ADD CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("salesSummaryId");
