-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "funded" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
