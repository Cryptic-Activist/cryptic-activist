/*
  Warnings:

  - Added the required column `userId` to the `payment_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_details" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "payment_details" ADD CONSTRAINT "payment_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
