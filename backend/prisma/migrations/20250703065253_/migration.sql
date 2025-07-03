/*
  Warnings:

  - You are about to drop the column `transactionId` on the `premium_purchases` table. All the data in the column will be lost.
  - You are about to drop the `transaction_payment_method` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blockchainTransactionHash` to the `premium_purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction_payment_method" DROP CONSTRAINT "transaction_payment_method_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_transactionPaymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- AlterTable
ALTER TABLE "premium_purchases" DROP COLUMN "transactionId",
ADD COLUMN     "blockchainTransactionHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- DropTable
DROP TABLE "transaction_payment_method";

-- DropTable
DROP TABLE "transactions";

-- DropEnum
DROP TYPE "TransactionPaymentMethodType";

-- DropEnum
DROP TYPE "TransactionStatus";
