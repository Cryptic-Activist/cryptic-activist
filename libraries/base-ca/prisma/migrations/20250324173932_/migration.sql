/*
  Warnings:

  - Added the required column `paymentMethodId` to the `trades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "paymentMethodId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
