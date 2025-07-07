-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "buyerfundedAt" TIMESTAMP,
ADD COLUMN     "sellerfundedAt" TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
