-- AlterTable
ALTER TABLE "admin_wallets" ADD COLUMN     "deletedAt" TIMESTAMP;

-- AlterTable
ALTER TABLE "user_wallets" ADD COLUMN     "deletedAt" TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
