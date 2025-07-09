/*
  Warnings:

  - You are about to drop the column `buyerfundedAt` on the `trades` table. All the data in the column will be lost.
  - You are about to drop the column `sellerfundedAt` on the `trades` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trades" DROP COLUMN "buyerfundedAt",
DROP COLUMN "sellerfundedAt",
ADD COLUMN     "buyerFundedAt" TIMESTAMP,
ADD COLUMN     "sellerFundedAt" TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
