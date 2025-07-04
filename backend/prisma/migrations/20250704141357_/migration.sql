/*
  Warnings:

  - You are about to alter the column `expectedAmount` on the `premium_purchases` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.

*/
-- AlterTable
ALTER TABLE "premium_purchases" ALTER COLUMN "expectedAmount" SET DATA TYPE DECIMAL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
