/*
  Warnings:

  - Added the required column `blockchainTradeId` to the `trade_escrow_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trade_escrow_details" ADD COLUMN     "blockchainTradeId" TEXT NOT NULL,
ADD COLUMN     "blockchainTransactionHash" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
