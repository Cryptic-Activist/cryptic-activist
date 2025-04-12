-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_vendorWalletId_fkey";

-- AlterTable
ALTER TABLE "trades" ALTER COLUMN "vendorWalletId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_vendorWalletId_fkey" FOREIGN KEY ("vendorWalletId") REFERENCES "wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
