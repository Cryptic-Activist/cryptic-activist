-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_blockedId_fkey";

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_blockerId_fkey";

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_tradeId_fkey";

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_offerId_fkey";

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_traderId_fkey";

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_cryptocurrencyId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_fiatId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "payment_methods" DROP CONSTRAINT "payment_methods_paymentMethodCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "system_messages" DROP CONSTRAINT "system_messages_userId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_cryptocurrencyId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_fiatId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_offerId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_traderId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "trusts" DROP CONSTRAINT "trusts_trustedId_fkey";

-- DropForeignKey
ALTER TABLE "trusts" DROP CONSTRAINT "trusts_trusterId_fkey";

-- DropForeignKey
ALTER TABLE "user_languages" DROP CONSTRAINT "user_languages_languageId_fkey";

-- DropForeignKey
ALTER TABLE "user_languages" DROP CONSTRAINT "user_languages_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isPremium" BOOLEAN DEFAULT false,
ADD COLUMN     "kycId" TEXT,
ADD COLUMN     "kycStatus" "KYCStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tierId" TEXT;

-- CreateTable
CREATE TABLE "tiers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "tradingFee" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "minVolume" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "premium_purchases" (
    "id" TEXT NOT NULL,
    "depositAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expectedAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "premium_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KYC" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "selfieUrl" TEXT NOT NULL,
    "proofOfAddress" TEXT NOT NULL,
    "status" "KYCStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KYC_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tiers_name_key" ON "tiers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_level_key" ON "tiers"("level");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_depositAddress_key" ON "premium_purchases"("depositAddress");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_userId_key" ON "premium_purchases"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KYC_userId_key" ON "KYC"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "trades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_messages" ADD CONSTRAINT "system_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_paymentMethodCategoryId_fkey" FOREIGN KEY ("paymentMethodCategoryId") REFERENCES "payment_method_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trusts" ADD CONSTRAINT "trusts_trusterId_fkey" FOREIGN KEY ("trusterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trusts" ADD CONSTRAINT "trusts_trustedId_fkey" FOREIGN KEY ("trustedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "cryptocurrencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "fiats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "cryptocurrencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "fiats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_purchases" ADD CONSTRAINT "premium_purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KYC" ADD CONSTRAINT "KYC_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
