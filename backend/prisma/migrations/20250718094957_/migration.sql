-- AlterTable
ALTER TABLE "tiers" ALTER COLUMN "tradingFee" SET DATA TYPE DECIMAL(10,8),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(10,8);

-- AlterTable
ALTER TABLE "trade_escrow_details" ALTER COLUMN "feeRate" SET DATA TYPE DECIMAL(10,8),
ALTER COLUMN "profitMargin" SET DATA TYPE DECIMAL(10,8);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
