/*
  Warnings:

  - You are about to drop the column `userWalletId` on the `premium_purchases` table. All the data in the column will be lost.
  - Added the required column `payerWalletId` to the `premium_purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "premium_purchases" DROP CONSTRAINT "premium_purchases_userWalletId_fkey";

-- AlterTable
ALTER TABLE "premium_purchases" DROP COLUMN "userWalletId",
ADD COLUMN     "payerWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "premium_purchases" ADD CONSTRAINT "premium_purchases_payerWalletId_fkey" FOREIGN KEY ("payerWalletId") REFERENCES "user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
