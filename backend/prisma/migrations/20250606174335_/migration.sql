-- AlterTable
ALTER TABLE "TradeDispute" ADD COLUMN     "reason" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
