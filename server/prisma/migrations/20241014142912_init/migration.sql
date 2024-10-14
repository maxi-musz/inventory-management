/*
  Warnings:

  - The primary key for the `SalesSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chnagePercentage` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `salesSummaryId` on the `SalesSummary` table. All the data in the column will be lost.
  - The required column `id` was added to the `SalesSummary` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "SalesSummary" DROP CONSTRAINT "SalesSummary_pkey",
DROP COLUMN "chnagePercentage",
DROP COLUMN "salesSummaryId",
ADD COLUMN     "changePercentage" DOUBLE PRECISION,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("id");
