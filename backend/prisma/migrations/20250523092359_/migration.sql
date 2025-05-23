/*
  Warnings:

  - Added the required column `exchangeRate` to the `trades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "exchangeRate" DECIMAL(30,10) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
