-- AlterTable
ALTER TABLE "TradeDispute" ADD COLUMN     "loserId" TEXT,
ADD COLUMN     "winnerId" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "TradeDispute" ADD CONSTRAINT "TradeDispute_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeDispute" ADD CONSTRAINT "TradeDispute_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
