/*
  Warnings:

  - You are about to drop the column `traderId` on the `feedbacks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_traderId_fkey";

-- DropIndex
DROP INDEX "feedbacks_traderId_key";

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "traderId";
