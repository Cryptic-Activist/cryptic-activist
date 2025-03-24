-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_paymentReceiptId_fkey";

-- AlterTable
ALTER TABLE "trades" ALTER COLUMN "paymentReceiptId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_paymentReceiptId_fkey" FOREIGN KEY ("paymentReceiptId") REFERENCES "payment_receipts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
