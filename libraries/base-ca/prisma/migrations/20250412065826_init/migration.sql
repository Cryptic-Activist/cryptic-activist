/*
  Warnings:

  - Added the required column `traderWalletId` to the `trades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorWalletId` to the `trades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "traderWalletId" TEXT NOT NULL,
ADD COLUMN     "vendorWalletId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_vendorWalletId_fkey" FOREIGN KEY ("vendorWalletId") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_traderWalletId_fkey" FOREIGN KEY ("traderWalletId") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
