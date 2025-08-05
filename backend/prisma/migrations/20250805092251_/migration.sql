-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "tradeVolume" DECIMAL(30,10),
ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
