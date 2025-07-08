-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_tradeEscrowDetailsId_fkey";

-- AlterTable
ALTER TABLE "trades" ALTER COLUMN "tradeEscrowDetailsId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_tradeEscrowDetailsId_fkey" FOREIGN KEY ("tradeEscrowDetailsId") REFERENCES "trade_escrow_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;
