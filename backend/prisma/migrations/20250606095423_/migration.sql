-- AlterEnum
ALTER TYPE "DisputeType" ADD VALUE 'SCAM';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
