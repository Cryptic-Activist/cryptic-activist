-- AlterTable
ALTER TABLE "platform_settings" ADD COLUMN     "canBeDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
