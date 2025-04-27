/*
  Warnings:

  - A unique constraint covering the columns `[traderId]` on the table `feedbacks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `traderId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "traderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_traderId_key" ON "feedbacks"("traderId");

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
