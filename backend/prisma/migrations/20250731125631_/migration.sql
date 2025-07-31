/*
  Warnings:

  - You are about to drop the column `adminId` on the `banners` table. All the data in the column will be lost.
  - Added the required column `publishedById` to the `banners` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "banners" DROP CONSTRAINT "banners_adminId_fkey";

-- AlterTable
ALTER TABLE "banners" DROP COLUMN "adminId",
ADD COLUMN     "publishedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
