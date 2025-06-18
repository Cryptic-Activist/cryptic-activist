-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'SENIOR_ADMIN', 'MODERATOR', 'KYC_REVIEWER', 'DISPUTE_MANAGER', 'SUPPORT_AGENT', 'AUDITOR', 'FINANCE_MANAGER');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "KYCDocumentType" AS ENUM ('ALIEN_REGISTRATION_CARD', 'CITIZENSHIP_CERTIFICATE', 'CONSULAR_ID_CARD', 'DRIVERS_LICENSE', 'FIREARMS_LICENSE', 'GOVERNMENT_ISSUED_ID_CARD', 'HEALTH_INSURANCE_CARD', 'IMMIGRATION_DOCUMENT', 'INCOME_TAX_IDENTIFICATION_DOCUMENT', 'MILITARY_ID', 'NATIONAL_ID_CARD', 'PASSPORT', 'PERMANENT_RESIDENT_CARD', 'REFUGEE_TRAVEL_DOCUMENT', 'RESIDENCE_PERMIT', 'SOCIAL_SECURITY_CARD', 'TAX_IDENTIFICATION_CARD', 'VOTER_ID_CARD', 'WORK_PERMIT', 'OTHER');

-- CreateEnum
CREATE TYPE "SystemMessageType" AS ENUM ('TRADE_STARTED', 'TRADE_COMPLETED', 'TRADE_CANCELLED', 'TRADE_CANCELLED_BY_MODERATOR', 'TRADE_DISPUTE_OPENED', 'TRADE_DISPUTE_RESOLVED', 'TRADE_DISPUTE_MORE_EVIDENCES', 'TRADE_EXPIRED', 'TRADE_FAILED', 'TRADE_NEW_MESSAGE', 'NEW_LOGIN', 'MAINTENANCE', 'SUSPICIOUS_ACTIVITY', 'PASSWORD_CHANGED', 'TWO_FA_ENABLED', 'TWO_FA_DISABLED', 'ACCOUNT_VERIFICATION_REQUIRED', 'ACCOUNT_SUSPENDED', 'REVIEW_RECEIVED', 'REVIEW_REMINDER', 'POLICY_UPDATE', 'FEATURE_ANNOUNCEMENT', 'PROMOTIONAL_OFFER', 'COMPLIANCE_NOTICE', 'SYSTEM_ERROR', 'API_DOWNTIME', 'USER_WARNING');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED', 'EXPIRED', 'FAILED');

-- CreateEnum
CREATE TYPE "DisputeAction" AS ENUM ('STATUS_CHANGED', 'EVIDENCE_REQUESTED', 'MODERATOR_ASSIGNED', 'DECISION_MADE', 'USER_BANNED', 'SYSTEM_ESCALATION', 'MANUAL_ESCALATION');

-- CreateEnum
CREATE TYPE "EvidenceType" AS ENUM ('SCREENSHOT', 'VIDEO', 'BANK_STATEMENT', 'CHAT_LOG', 'PAYMENT_RECEIPT', 'OTHER');

-- CreateEnum
CREATE TYPE "EvidenceRequestStatus" AS ENUM ('PENDING', 'SUBMITTED', 'DECLINED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "DisputeType" AS ENUM ('PAYMENT_NOT_RECEIVED', 'PAYMENT_FRAUD', 'CRYPTO_NOT_RELEASED', 'INCORRECT_PAYMENT_AMOUNT', 'PAYMENT_TO_WRONG_ACCOUNT', 'FAKE_PAYMENT_PROOF', 'LATE_PAYMENT', 'COMMUNICATION_ISSUE', 'OFF_PLATFORM_TRANSACTION', 'TRADE_TIMEOUT', 'ABUSIVE_BEHAVIOR', 'IDENTITY_MISMATCH', 'PLATFORM_ERROR', 'SUSPICIOUS_ACTIVITY', 'SCAM', 'OTHER');

-- CreateEnum
CREATE TYPE "DisputePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "DisputeSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'PENDING_EVIDENCE', 'INVESTIGATING', 'ESCALATED', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "DisputeResolutionType" AS ENUM ('RELEASE_CRYPTO', 'REFUND_PAYMENT', 'CANCEL_TRADE', 'PARTIAL_REFUND', 'SPLIT_RESOLUTION', 'NO_ACTION_TAKEN', 'OFF_PLATFORM_DECISION', 'PLATFORM_COMPENSATION');

-- CreateEnum
CREATE TYPE "TransactionPaymentMethodType" AS ENUM ('CREDIT_CARD');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'ESCALATED', 'CLOSED', 'ACTION_TAKEN', 'NO_ACTION_NEEDED');

-- CreateEnum
CREATE TYPE "ModerationAction" AS ENUM ('SEND_WARNING', 'SUSPEND', 'ACCOUNT_REVIEW');

-- CreateTable
CREATE TABLE "accepted_cryptocurrencies" (
    "id" TEXT NOT NULL,
    "coingeckoId" VARCHAR(200) NOT NULL,
    "symbol" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "accepted_cryptocurrencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_roles" (
    "id" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "admin_roles_pkey" PRIMARY KEY ("id")
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
    "twoFactorSecret" TEXT,
    "twoFactorEnabled" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL,
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,
    "reason" VARCHAR(255),
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
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
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "cryptocurrencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "traderId" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fiats" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "fiats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploaded_files" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "mimeType" TEXT,
    "size" INTEGER,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "uploaded_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kycs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "KYCStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "documentType" "KYCDocumentType" NOT NULL,
    "documentNumber" VARCHAR(100),
    "additionalNotes" TEXT,
    "nationality" TEXT NOT NULL,
    "documentFrontId" TEXT NOT NULL,
    "documentBackId" TEXT,
    "selfieId" TEXT NOT NULL,
    "utilityBillId" TEXT,
    "bankStatementId" TEXT,
    "submittedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP,
    "reviewedById" TEXT,

    CONSTRAINT "kycs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

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
    "timeLimit" INTEGER NOT NULL,
    "tags" TEXT[],
    "label" TEXT NOT NULL,
    "terms" TEXT NOT NULL,
    "averageTradeSpeed" DOUBLE PRECISION,
    "instructions" TEXT NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "vendorId" TEXT NOT NULL,
    "vendorWalletAddress" TEXT NOT NULL,
    "cryptocurrencyId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "paymentDetailsId" TEXT NOT NULL,
    "fiatId" TEXT NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "isRisky" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "paymentMethodCategoryId" TEXT NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_method_categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "payment_method_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_receipts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "payment_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_details" (
    "id" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "paymentMethodId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

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
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "premium_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "refereeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_messages" (
    "id" TEXT NOT NULL,
    "type" "SystemMessageType" NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "whenSeen" TIMESTAMP,
    "url" TEXT,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
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
    "requiredXP" INTEGER NOT NULL,

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
    "exchangeRate" DECIMAL(30,10) NOT NULL,
    "startedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP,
    "expiredAt" TIMESTAMP,
    "disputedAt" TIMESTAMP,
    "status" "TradeStatus" NOT NULL,
    "paidAt" TIMESTAMP,
    "fundedAt" TIMESTAMP,
    "paymentConfirmedAt" TIMESTAMP,
    "escrowReleasedAt" TIMESTAMP,
    "blockchainTradeId" BIGINT,
    "blockchainTransactionHash" TEXT,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_party_notes" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_party_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_audit_logs" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "changedById" TEXT,
    "action" "DisputeAction" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_evidences" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "submittedById" TEXT NOT NULL,
    "type" "EvidenceType" NOT NULL,
    "fileId" TEXT,
    "textContent" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_evidences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_evidence_requests" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "requestedFromId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP,
    "submittedAt" TIMESTAMP,
    "status" "EvidenceRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "dispute_evidence_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trade_disputes" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "raisedById" TEXT NOT NULL,
    "type" "DisputeType" NOT NULL,
    "vendorStatement" TEXT DEFAULT '',
    "traderStatement" TEXT DEFAULT '',
    "severity" "DisputeSeverity" NOT NULL,
    "status" "DisputeStatus" NOT NULL,
    "resolutionNote" TEXT,
    "resolutionType" "DisputeResolutionType",
    "resolvedAt" TIMESTAMP,
    "moderatorId" TEXT,
    "priority" "DisputePriority" NOT NULL DEFAULT 'MEDIUM',
    "slaDueAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "winnerId" TEXT,
    "loserId" TEXT,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "trade_disputes_pkey" PRIMARY KEY ("id")
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
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trusts" (
    "id" TEXT NOT NULL,
    "trusterId" TEXT NOT NULL,
    "trustedId" TEXT NOT NULL,
    "trustLabel" INTEGER,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "trusts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_stats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalDisputes" INTEGER NOT NULL DEFAULT 0,
    "disputesLost" INTEGER NOT NULL DEFAULT 0,
    "fraudFlagged" BOOLEAN NOT NULL DEFAULT false,
    "lastDisputeDate" TIMESTAMP,

    CONSTRAINT "user_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_languages" (
    "userId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "user_languages_pkey" PRIMARY KEY ("userId","languageId")
);

-- CreateTable
CREATE TABLE "user_suspensions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "initiatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suspendedUntil" TIMESTAMP,
    "moderatorId" TEXT,
    "disputeId" TEXT,
    "liftedAt" TIMESTAMP,
    "liftedById" TEXT,
    "liftReason" TEXT,

    CONSTRAINT "user_suspensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_suspension_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "moderatorId" TEXT,
    "disputeId" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_suspension_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_warnings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedById" TEXT,
    "relatedDisputeId" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_warnings_pkey" PRIMARY KEY ("id")
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
    "underReview" BOOLEAN NOT NULL DEFAULT false,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "trustScore" INTEGER NOT NULL DEFAULT 50,
    "twoFactorSecret" TEXT,
    "twoFactorEnabled" BOOLEAN DEFAULT false,
    "lastLoginAt" TIMESTAMP,
    "createdById" TEXT,
    "lastUpdatedById" TEXT,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "tierId" TEXT,
    "kycId" TEXT,
    "referralCode" VARCHAR(20) NOT NULL DEFAULT substring(md5(gen_random_uuid()::text), 1, 16),
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "suspensionId" TEXT,
    "totalWarnings" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT NOT NULL,
    "reviewerId" TEXT,
    "relatedDisputeId" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP,
    "resolutionNote" TEXT,

    CONSTRAINT "account_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_moderation_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "ModerationAction" NOT NULL,
    "message" TEXT,
    "relatedReviewId" TEXT,
    "moderatorId" TEXT,
    "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_moderation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DisputeEvidenceToDisputeEvidenceRequest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DisputeEvidenceToDisputeEvidenceRequest_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "accepted_cryptocurrencies_coingeckoId_key" ON "accepted_cryptocurrencies"("coingeckoId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_roles_adminId_role_key" ON "admin_roles"("adminId", "role");

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
CREATE UNIQUE INDEX "kycs_userId_key" ON "kycs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_documentFrontId_key" ON "kycs"("documentFrontId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_documentBackId_key" ON "kycs"("documentBackId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_selfieId_key" ON "kycs"("selfieId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_utilityBillId_key" ON "kycs"("utilityBillId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_bankStatementId_key" ON "kycs"("bankStatementId");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_depositAddress_key" ON "premium_purchases"("depositAddress");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_userId_key" ON "premium_purchases"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_refereeId_key" ON "referrals"("refereeId");

-- CreateIndex
CREATE INDEX "referrals_referrerId_idx" ON "referrals"("referrerId");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_name_key" ON "tiers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_level_key" ON "tiers"("level");

-- CreateIndex
CREATE UNIQUE INDEX "dispute_evidences_fileId_key" ON "dispute_evidences"("fileId");

-- CreateIndex
CREATE INDEX "dispute_evidence_requests_disputeId_requestedFromId_idx" ON "dispute_evidence_requests"("disputeId", "requestedFromId");

-- CreateIndex
CREATE UNIQUE INDEX "trade_disputes_tradeId_key" ON "trade_disputes"("tradeId");

-- CreateIndex
CREATE INDEX "trade_disputes_status_priority_idx" ON "trade_disputes"("status", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_gatewayTransactionId_key" ON "transactions"("gatewayTransactionId");

-- CreateIndex
CREATE UNIQUE INDEX "trusts_trusterId_trustedId_key" ON "trusts"("trusterId", "trustedId");

-- CreateIndex
CREATE UNIQUE INDEX "user_stats_userId_key" ON "user_stats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_suspensions_userId_key" ON "user_suspensions"("userId");

-- CreateIndex
CREATE INDEX "user_warnings_userId_idx" ON "user_warnings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_privateKeys_key" ON "users"("privateKeys");

-- CreateIndex
CREATE UNIQUE INDEX "users_referralCode_key" ON "users"("referralCode");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "account_reviews_status_idx" ON "account_reviews"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_token_key" ON "tokens"("id", "token");

-- CreateIndex
CREATE INDEX "_DisputeEvidenceToDisputeEvidenceRequest_B_index" ON "_DisputeEvidenceToDisputeEvidenceRequest"("B");

-- AddForeignKey
ALTER TABLE "admin_roles" ADD CONSTRAINT "admin_roles_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "kycs" ADD CONSTRAINT "kycs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kycs" ADD CONSTRAINT "kycs_documentFrontId_fkey" FOREIGN KEY ("documentFrontId") REFERENCES "uploaded_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kycs" ADD CONSTRAINT "kycs_documentBackId_fkey" FOREIGN KEY ("documentBackId") REFERENCES "uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kycs" ADD CONSTRAINT "kycs_selfieId_fkey" FOREIGN KEY ("selfieId") REFERENCES "uploaded_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kycs" ADD CONSTRAINT "kycs_utilityBillId_fkey" FOREIGN KEY ("utilityBillId") REFERENCES "uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kycs" ADD CONSTRAINT "kycs_bankStatementId_fkey" FOREIGN KEY ("bankStatementId") REFERENCES "uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kycs" ADD CONSTRAINT "kycs_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "cryptocurrencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_paymentDetailsId_fkey" FOREIGN KEY ("paymentDetailsId") REFERENCES "payment_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "fiats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_paymentMethodCategoryId_fkey" FOREIGN KEY ("paymentMethodCategoryId") REFERENCES "payment_method_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_details" ADD CONSTRAINT "payment_details_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_details" ADD CONSTRAINT "payment_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_purchases" ADD CONSTRAINT "premium_purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "dispute_party_notes" ADD CONSTRAINT "dispute_party_notes_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "trade_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_party_notes" ADD CONSTRAINT "dispute_party_notes_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_party_notes" ADD CONSTRAINT "dispute_party_notes_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_audit_logs" ADD CONSTRAINT "dispute_audit_logs_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "trade_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_audit_logs" ADD CONSTRAINT "dispute_audit_logs_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidences" ADD CONSTRAINT "dispute_evidences_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "trade_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidences" ADD CONSTRAINT "dispute_evidences_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidences" ADD CONSTRAINT "dispute_evidences_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidence_requests" ADD CONSTRAINT "dispute_evidence_requests_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "trade_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidence_requests" ADD CONSTRAINT "dispute_evidence_requests_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidence_requests" ADD CONSTRAINT "dispute_evidence_requests_requestedFromId_fkey" FOREIGN KEY ("requestedFromId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_disputes" ADD CONSTRAINT "trade_disputes_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "trades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_disputes" ADD CONSTRAINT "trade_disputes_raisedById_fkey" FOREIGN KEY ("raisedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_disputes" ADD CONSTRAINT "trade_disputes_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_disputes" ADD CONSTRAINT "trade_disputes_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_disputes" ADD CONSTRAINT "trade_disputes_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_suspensions" ADD CONSTRAINT "user_suspensions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_suspensions" ADD CONSTRAINT "user_suspensions_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_suspensions" ADD CONSTRAINT "user_suspensions_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "trade_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_suspensions" ADD CONSTRAINT "user_suspensions_liftedById_fkey" FOREIGN KEY ("liftedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_suspension_logs" ADD CONSTRAINT "user_suspension_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_suspension_logs" ADD CONSTRAINT "user_suspension_logs_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_suspension_logs" ADD CONSTRAINT "user_suspension_logs_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "trade_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_warnings" ADD CONSTRAINT "user_warnings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_warnings" ADD CONSTRAINT "user_warnings_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_warnings" ADD CONSTRAINT "user_warnings_relatedDisputeId_fkey" FOREIGN KEY ("relatedDisputeId") REFERENCES "trade_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_reviews" ADD CONSTRAINT "account_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_reviews" ADD CONSTRAINT "account_reviews_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_reviews" ADD CONSTRAINT "account_reviews_relatedDisputeId_fkey" FOREIGN KEY ("relatedDisputeId") REFERENCES "trade_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisputeEvidenceToDisputeEvidenceRequest" ADD CONSTRAINT "_DisputeEvidenceToDisputeEvidenceRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "dispute_evidences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisputeEvidenceToDisputeEvidenceRequest" ADD CONSTRAINT "_DisputeEvidenceToDisputeEvidenceRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "dispute_evidence_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
