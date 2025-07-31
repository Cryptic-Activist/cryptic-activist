-- AlterTable
ALTER TABLE "banners" ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
