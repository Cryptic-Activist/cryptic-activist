/*
  Warnings:

  - Added the required column `requiredXP` to the `tiers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tiers" ADD COLUMN     "requiredXP" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
