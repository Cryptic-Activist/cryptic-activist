/*
  Warnings:

  - Added the required column `platformWalletId` to the `smart_contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "smart_contracts" ADD COLUMN     "platformWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "smart_contracts" ADD CONSTRAINT "smart_contracts_platformWalletId_fkey" FOREIGN KEY ("platformWalletId") REFERENCES "admin_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
