-- AlterTable
ALTER TABLE "platform_settings" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
