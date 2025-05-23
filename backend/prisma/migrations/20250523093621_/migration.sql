/*
  Warnings:

  - You are about to drop the column `paymentDetailsId` on the `trades` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_paymentDetailsId_fkey";

-- AlterTable
ALTER TABLE "trades" DROP COLUMN "paymentDetailsId";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
