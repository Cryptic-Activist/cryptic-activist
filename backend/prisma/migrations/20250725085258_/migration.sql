-- AlterEnum
ALTER TYPE "SystemMessageType" ADD VALUE 'PREMIUM_EXPIRY_WARNING';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
