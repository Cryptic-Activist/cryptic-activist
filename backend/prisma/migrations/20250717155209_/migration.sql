/*
  Warnings:

  - You are about to alter the column `listAt` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `limitMin` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `limitMax` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `averageTradeSpeed` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `tradingFee` on the `tiers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `discount` on the `tiers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `volume` on the `tiers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `feeRate` on the `trade_escrow_details` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `profitMargin` on the `trade_escrow_details` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `cryptocurrencyAmount` on the `trades` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `fiatAmount` on the `trades` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Changed the type of `tradeAmountInWei` on the `trade_escrow_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `buyerCollateralInWei` on the `trade_escrow_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sellerCollateralInWei` on the `trade_escrow_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sellerTotalFundInWei` on the `trade_escrow_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "offers" ALTER COLUMN "listAt" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "limitMin" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "limitMax" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "averageTradeSpeed" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "tiers" ALTER COLUMN "tradingFee" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "volume" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "trade_escrow_details" ALTER COLUMN "feeRate" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "profitMargin" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "tradeAmountInWei",
ADD COLUMN     "tradeAmountInWei" DECIMAL(65,30) NOT NULL,
DROP COLUMN "buyerCollateralInWei",
ADD COLUMN     "buyerCollateralInWei" DECIMAL(65,30) NOT NULL,
DROP COLUMN "sellerCollateralInWei",
ADD COLUMN     "sellerCollateralInWei" DECIMAL(65,30) NOT NULL,
DROP COLUMN "sellerTotalFundInWei",
ADD COLUMN     "sellerTotalFundInWei" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "trades" ALTER COLUMN "cryptocurrencyAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "fiatAmount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
