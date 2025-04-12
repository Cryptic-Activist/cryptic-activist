/*
  Warnings:

  - You are about to drop the column `traderWalletId` on the `trades` table. All the data in the column will be lost.
  - You are about to drop the column `vendorWalletId` on the `trades` table. All the data in the column will be lost.
  - You are about to drop the `wallet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `traderWalletAddress` to the `trades` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_traderWalletId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_vendorWalletId_fkey";

-- DropForeignKey
ALTER TABLE "wallet" DROP CONSTRAINT "wallet_userId_fkey";

-- AlterTable
ALTER TABLE "trades" DROP COLUMN "traderWalletId",
DROP COLUMN "vendorWalletId",
ADD COLUMN     "traderWalletAddress" TEXT NOT NULL,
ADD COLUMN     "vendorWalletAddress" TEXT;

-- DropTable
DROP TABLE "wallet";

-- DropEnum
DROP TYPE "WalletType";
