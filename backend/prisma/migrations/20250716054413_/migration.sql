-- AlterTable
ALTER TABLE "cryptocurrency_chains" ADD COLUMN     "abiUrl" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
