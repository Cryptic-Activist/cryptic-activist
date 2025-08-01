/*
  Warnings:

  - You are about to drop the column `vendorWalletAddress` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `deployerAddress` on the `smart_contracts` table. All the data in the column will be lost.
  - You are about to drop the column `arbitratorWallet` on the `trade_escrow_details` table. All the data in the column will be lost.
  - You are about to drop the column `buyerWallet` on the `trade_escrow_details` table. All the data in the column will be lost.
  - You are about to drop the column `sellerWallet` on the `trade_escrow_details` table. All the data in the column will be lost.
  - You are about to drop the column `traderWalletAddress` on the `trades` table. All the data in the column will be lost.
  - You are about to drop the column `vendorWalletAddress` on the `trades` table. All the data in the column will be lost.
  - Added the required column `vendorWalletId` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deployerWalletId` to the `smart_contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arbitratorWalletId` to the `trade_escrow_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerWalletId` to the `trade_escrow_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerWalletId` to the `trade_escrow_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offers" DROP COLUMN "vendorWalletAddress",
ADD COLUMN     "vendorWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "smart_contracts" DROP COLUMN "deployerAddress",
ADD COLUMN     "deployerWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "trade_escrow_details" DROP COLUMN "arbitratorWallet",
DROP COLUMN "buyerWallet",
DROP COLUMN "sellerWallet",
ADD COLUMN     "arbitratorWalletId" TEXT NOT NULL,
ADD COLUMN     "buyerWalletId" TEXT NOT NULL,
ADD COLUMN     "sellerWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "trades" DROP COLUMN "traderWalletAddress",
DROP COLUMN "vendorWalletAddress",
ADD COLUMN     "traderWalletId" TEXT,
ADD COLUMN     "vendorWalletId" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_vendorWalletId_fkey" FOREIGN KEY ("vendorWalletId") REFERENCES "user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smart_contracts" ADD CONSTRAINT "smart_contracts_deployerWalletId_fkey" FOREIGN KEY ("deployerWalletId") REFERENCES "admin_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_escrow_details" ADD CONSTRAINT "trade_escrow_details_arbitratorWalletId_fkey" FOREIGN KEY ("arbitratorWalletId") REFERENCES "admin_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_escrow_details" ADD CONSTRAINT "trade_escrow_details_buyerWalletId_fkey" FOREIGN KEY ("buyerWalletId") REFERENCES "user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_escrow_details" ADD CONSTRAINT "trade_escrow_details_sellerWalletId_fkey" FOREIGN KEY ("sellerWalletId") REFERENCES "user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_vendorWalletId_fkey" FOREIGN KEY ("vendorWalletId") REFERENCES "user_wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_traderWalletId_fkey" FOREIGN KEY ("traderWalletId") REFERENCES "user_wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
