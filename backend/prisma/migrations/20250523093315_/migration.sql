/*
  Warnings:

  - Added the required column `paymentDetailsId` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "paymentDetailsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_paymentDetailsId_fkey" FOREIGN KEY ("paymentDetailsId") REFERENCES "payment_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
