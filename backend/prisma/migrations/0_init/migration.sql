-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "TransactionPaymentMethodType" AS ENUM ('CREDIT_CARD');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "accepted_cryptocurrencies" (
    "id" TEXT NOT NULL,
    "coingeckoId" VARCHAR(200) NOT NULL,
    "symbol" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "accepted_cryptocurrencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "username" VARCHAR(120) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL,
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,
    "reason" VARCHAR(255),
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "tradeId" TEXT NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cryptocurrencies" (
    "id" TEXT NOT NULL,
    "coingeckoId" VARCHAR(200) NOT NULL,
    "symbol" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "image" TEXT NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "cryptocurrencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "traderId" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fiats" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "fiats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kyc" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "selfieUrl" TEXT NOT NULL,
    "proofOfAddress" TEXT NOT NULL,
    "status" "KYCStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" DATE,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "kyc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "offerType" TEXT NOT NULL,
    "pricingType" TEXT NOT NULL,
    "listAt" DOUBLE PRECISION NOT NULL,
    "limitMin" DOUBLE PRECISION NOT NULL,
    "limitMax" DOUBLE PRECISION NOT NULL,
    "timeLimit" DOUBLE PRECISION NOT NULL,
    "tags" TEXT[],
    "label" TEXT NOT NULL,
    "terms" TEXT NOT NULL,
    "averageTradeSpeed" DOUBLE PRECISION,
    "instructions" TEXT NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "vendorId" TEXT NOT NULL,
    "vendorWalletAddress" TEXT NOT NULL,
    "cryptocurrencyId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "fiatId" TEXT NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "paymentMethodCategoryId" TEXT NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_method_categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "payment_method_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_receipts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "payment_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_details" (
    "id" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "paymentMethodId" TEXT NOT NULL,

    CONSTRAINT "payment_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "premium_purchases" (
    "id" TEXT NOT NULL,
    "depositAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expectedAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "transactionId" TEXT,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "premium_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_messages" (
    "id" TEXT NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "whenSeen" TIMESTAMP(3),
    "url" TEXT NOT NULL,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "userId" TEXT NOT NULL,

    CONSTRAINT "system_messages_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "trades" (
    "id" TEXT NOT NULL,
    "paymentReceiptId" TEXT,
    "vendorId" TEXT NOT NULL,
    "vendorWalletAddress" TEXT,
    "traderId" TEXT NOT NULL,
    "traderWalletAddress" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "cryptocurrencyId" TEXT NOT NULL,
    "fiatId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "cryptocurrencyAmount" DOUBLE PRECISION NOT NULL,
    "fiatAmount" DOUBLE PRECISION NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "expiredAt" TIMESTAMP(3),
    "status" "TradeStatus" NOT NULL,
    "paid" BOOLEAN DEFAULT false,
    "paymentConfirmed" BOOLEAN DEFAULT false,
    "escrowReleaseDate" DATE,
    "blockchainTradeId" BIGINT,
    "blockchainTransactionHash" TEXT,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "paymentDetailsId" TEXT,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_payment_method" (
    "id" TEXT NOT NULL,
    "transactionPaymentMethodId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TransactionPaymentMethodType" NOT NULL,

    CONSTRAINT "transaction_payment_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionPaymentMethodId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "gatewayTransactionId" TEXT,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trusts" (
    "id" TEXT NOT NULL,
    "trusterId" TEXT NOT NULL,
    "trustedId" TEXT NOT NULL,
    "trustLabel" INTEGER,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "trusts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_languages" (
    "userId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "user_languages_pkey" PRIMARY KEY ("userId","languageId")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "profileColor" VARCHAR(10) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "username" VARCHAR(120) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" TEXT NOT NULL,
    "privateKeys" TEXT[],
    "isVerified" BOOLEAN DEFAULT false,
    "isPremium" BOOLEAN,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "twoFactorSecret" TEXT,
    "twoFactorEnabled" BOOLEAN DEFAULT false,
    "lastLoginAt" TIMESTAMPTZ,
    "createdById" TEXT,
    "lastUpdatedById" TEXT,
    "deletedAt" DATE,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "tierId" TEXT,
    "kycId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accepted_cryptocurrencies_coingeckoId_key" ON "accepted_cryptocurrencies"("coingeckoId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_blockerId_blockedId_key" ON "blocks"("blockerId", "blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "chats_tradeId_key" ON "chats"("tradeId");

-- CreateIndex
CREATE UNIQUE INDEX "cryptocurrencies_coingeckoId_key" ON "cryptocurrencies"("coingeckoId");

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_tradeId_key" ON "feedbacks"("tradeId");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_userId_key" ON "kyc"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_depositAddress_key" ON "premium_purchases"("depositAddress");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_userId_key" ON "premium_purchases"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_name_key" ON "tiers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_level_key" ON "tiers"("level");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_gatewayTransactionId_key" ON "transactions"("gatewayTransactionId");

-- CreateIndex
CREATE UNIQUE INDEX "trusts_trusterId_trustedId_key" ON "trusts"("trusterId", "trustedId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_privateKeys_key" ON "users"("privateKeys");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_token_key" ON "tokens"("id", "token");

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "trades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "trades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kyc" ADD CONSTRAINT "kyc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kyc" ADD CONSTRAINT "kyc_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "cryptocurrencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "fiats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_paymentMethodCategoryId_fkey" FOREIGN KEY ("paymentMethodCategoryId") REFERENCES "payment_method_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_details" ADD CONSTRAINT "payment_details_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_purchases" ADD CONSTRAINT "premium_purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_messages" ADD CONSTRAINT "system_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_paymentReceiptId_fkey" FOREIGN KEY ("paymentReceiptId") REFERENCES "payment_receipts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "cryptocurrencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "fiats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_paymentDetailsId_fkey" FOREIGN KEY ("paymentDetailsId") REFERENCES "payment_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_payment_method" ADD CONSTRAINT "transaction_payment_method_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transactionPaymentMethodId_fkey" FOREIGN KEY ("transactionPaymentMethodId") REFERENCES "transaction_payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trusts" ADD CONSTRAINT "trusts_trusterId_fkey" FOREIGN KEY ("trusterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trusts" ADD CONSTRAINT "trusts_trustedId_fkey" FOREIGN KEY ("trustedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

