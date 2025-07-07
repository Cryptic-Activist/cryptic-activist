/*
  Warnings:

  - Added the required column `tradeEscrowDetailsId` to the `trades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "tradeEscrowDetailsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- CreateTable
CREATE TABLE "trade_escrow_details" (
    "id" TEXT NOT NULL,
    "arbitratorWallet" TEXT NOT NULL,
    "buyerWallet" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "cryptocurrencyAmount" BIGINT NOT NULL,
    "feeRate" DOUBLE PRECISION NOT NULL,
    "profitMargin" DOUBLE PRECISION NOT NULL,
    "tradeDurationInSeconds" INTEGER NOT NULL,
    "buyerCollateralInWei" BIGINT NOT NULL,
    "sellerCollateralInWei" BIGINT NOT NULL,
    "sellerTotalFundInWei" BIGINT NOT NULL,

    CONSTRAINT "trade_escrow_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_tradeEscrowDetailsId_fkey" FOREIGN KEY ("tradeEscrowDetailsId") REFERENCES "trade_escrow_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
