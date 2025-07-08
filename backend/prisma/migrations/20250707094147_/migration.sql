/*
  Warnings:

  - You are about to drop the column `cryptocurrencyAmount` on the `trade_escrow_details` table. All the data in the column will be lost.
  - Added the required column `tradeAmountInWei` to the `trade_escrow_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trade_escrow_details" DROP COLUMN "cryptocurrencyAmount",
ADD COLUMN     "tradeAmountInWei" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
