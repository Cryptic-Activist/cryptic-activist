/*
  Warnings:

  - You are about to drop the column `seller` on the `trade_escrow_details` table. All the data in the column will be lost.
  - Added the required column `sellerWallet` to the `trade_escrow_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trade_escrow_details" DROP COLUMN "seller",
ADD COLUMN     "sellerWallet" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
