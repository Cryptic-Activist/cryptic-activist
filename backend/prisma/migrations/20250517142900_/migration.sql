-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- CreateIndex
CREATE INDEX "referrals_referrerId_idx" ON "referrals"("referrerId");
