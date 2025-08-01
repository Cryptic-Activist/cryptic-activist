-- AlterTable
ALTER TABLE "admin_wallets" ADD COLUMN     "isArbitrator" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
