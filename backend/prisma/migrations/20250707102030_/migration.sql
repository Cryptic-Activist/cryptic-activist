-- AlterTable
ALTER TABLE "trade_escrow_details" ALTER COLUMN "buyerCollateralInWei" SET DATA TYPE TEXT,
ALTER COLUMN "sellerCollateralInWei" SET DATA TYPE TEXT,
ALTER COLUMN "sellerTotalFundInWei" SET DATA TYPE TEXT,
ALTER COLUMN "tradeAmountInWei" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
