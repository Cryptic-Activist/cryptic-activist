/*
  Warnings:

  - Added the required column `expiresAt` to the `premium_purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `premium_purchases` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `premium_purchases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `createdAt` on table `premium_purchases` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `premium_purchases` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PremiumPurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PremiumPeriod" AS ENUM ('MONTHLY', 'YEARLY');

-- DropIndex
DROP INDEX "premium_purchases_userId_key";

-- AlterTable
ALTER TABLE "premium_purchases" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "period" "PremiumPeriod" NOT NULL,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "PremiumPurchaseStatus" NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- CreateIndex
CREATE INDEX "premium_purchases_userId_status_expiresAt_idx" ON "premium_purchases"("userId", "status", "expiresAt");
