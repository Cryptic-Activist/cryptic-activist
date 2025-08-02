/*
  Warnings:

  - You are about to drop the column `payerAddress` on the `premium_purchases` table. All the data in the column will be lost.
  - Added the required column `userWalletId` to the `premium_purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "premium_purchases" DROP COLUMN "payerAddress",
ADD COLUMN     "userWalletId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "premium_purchases" ADD CONSTRAINT "premium_purchases_userWalletId_fkey" FOREIGN KEY ("userWalletId") REFERENCES "user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
