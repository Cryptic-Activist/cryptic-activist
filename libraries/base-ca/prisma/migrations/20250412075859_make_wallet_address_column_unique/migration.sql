/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wallet_address_key" ON "wallet"("address");
