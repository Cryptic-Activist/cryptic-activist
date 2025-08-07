-- CreateEnum
CREATE TYPE "public"."AdminRole" AS ENUM ('SUPER_ADMIN', 'SENIOR_ADMIN', 'MODERATOR', 'KYC_REVIEWER', 'DISPUTE_MANAGER', 'SUPPORT_AGENT', 'AUDITOR', 'FINANCE_MANAGER');

-- CreateEnum
CREATE TYPE "public"."FeedbackType" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "public"."KYCStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."KYCDocumentType" AS ENUM ('ALIEN_REGISTRATION_CARD', 'CITIZENSHIP_CERTIFICATE', 'CONSULAR_ID_CARD', 'DRIVERS_LICENSE', 'FIREARMS_LICENSE', 'GOVERNMENT_ISSUED_ID_CARD', 'HEALTH_INSURANCE_CARD', 'IMMIGRATION_DOCUMENT', 'INCOME_TAX_IDENTIFICATION_DOCUMENT', 'MILITARY_ID', 'NATIONAL_ID_CARD', 'PASSPORT', 'PERMANENT_RESIDENT_CARD', 'REFUGEE_TRAVEL_DOCUMENT', 'RESIDENCE_PERMIT', 'SOCIAL_SECURITY_CARD', 'TAX_IDENTIFICATION_CARD', 'VOTER_ID_CARD', 'WORK_PERMIT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PremiumPurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "public"."PremiumPeriod" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "public"."SystemMessageType" AS ENUM ('TRADE_STARTED', 'TRADE_COMPLETED', 'TRADE_CANCELLED', 'TRADE_CANCELLED_BY_MODERATOR', 'TRADE_DISPUTE_OPENED', 'TRADE_DISPUTE_RESOLVED', 'TRADE_DISPUTE_MORE_EVIDENCES', 'TRADE_EXPIRED', 'TRADE_FAILED', 'TRADE_NEW_MESSAGE', 'NEW_LOGIN', 'MAINTENANCE', 'SUSPICIOUS_ACTIVITY', 'PASSWORD_CHANGED', 'TWO_FA_ENABLED', 'TWO_FA_DISABLED', 'ACCOUNT_VERIFICATION_REQUIRED', 'ACCOUNT_SUSPENDED', 'REVIEW_RECEIVED', 'REVIEW_REMINDER', 'POLICY_UPDATE', 'FEATURE_ANNOUNCEMENT', 'PROMOTIONAL_OFFER', 'COMPLIANCE_NOTICE', 'SYSTEM_ERROR', 'API_DOWNTIME', 'USER_WARNING', 'PREMIUM_EXPIRY_WARNING');

-- CreateEnum
CREATE TYPE "public"."TradeStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED', 'EXPIRED', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."DisputeAction" AS ENUM ('STATUS_CHANGED', 'EVIDENCE_REQUESTED', 'MODERATOR_ASSIGNED', 'DECISION_MADE', 'USER_BANNED', 'SYSTEM_ESCALATION', 'MANUAL_ESCALATION');

-- CreateEnum
CREATE TYPE "public"."EvidenceType" AS ENUM ('SCREENSHOT', 'VIDEO', 'BANK_STATEMENT', 'CHAT_LOG', 'PAYMENT_RECEIPT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EvidenceRequestStatus" AS ENUM ('PENDING', 'SUBMITTED', 'DECLINED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."DisputeType" AS ENUM ('PAYMENT_NOT_RECEIVED', 'PAYMENT_FRAUD', 'CRYPTO_NOT_RELEASED', 'INCORRECT_PAYMENT_AMOUNT', 'PAYMENT_TO_WRONG_ACCOUNT', 'FAKE_PAYMENT_PROOF', 'LATE_PAYMENT', 'COMMUNICATION_ISSUE', 'OFF_PLATFORM_TRANSACTION', 'TRADE_TIMEOUT', 'ABUSIVE_BEHAVIOR', 'IDENTITY_MISMATCH', 'PLATFORM_ERROR', 'SUSPICIOUS_ACTIVITY', 'SCAM', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."DisputePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."DisputeSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."DisputeStatus" AS ENUM ('OPEN', 'PENDING_EVIDENCE', 'INVESTIGATING', 'ESCALATED', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."DisputeResolutionType" AS ENUM ('RELEASE_CRYPTO', 'REFUND_PAYMENT', 'CANCEL_TRADE', 'PARTIAL_REFUND', 'SPLIT_RESOLUTION', 'NO_ACTION_TAKEN', 'OFF_PLATFORM_DECISION', 'PLATFORM_COMPENSATION');

-- CreateEnum
CREATE TYPE "public"."ReviewStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'ESCALATED', 'CLOSED', 'ACTION_TAKEN', 'NO_ACTION_NEEDED');

-- CreateEnum
CREATE TYPE "public"."ModerationAction" AS ENUM ('SEND_WARNING', 'SUSPEND', 'ACCOUNT_REVIEW');

-- CreateEnum
CREATE TYPE "public"."SettingType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'JSON');

-- CreateEnum
CREATE TYPE "public"."BannerType" AS ENUM ('WARNING', 'NEW_FEATURE', 'ANNOUNCEMENT');

-- CreateTable
CREATE TABLE "public"."accepted_cryptocurrencies" (
    "id" TEXT NOT NULL,
    "coingeckoId" VARCHAR(200) NOT NULL,
    "symbol" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "accepted_cryptocurrencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin_admin_role" (
    "adminId" TEXT NOT NULL,
    "adminRolesId" TEXT NOT NULL,

    CONSTRAINT "admin_admin_role_pkey" PRIMARY KEY ("adminId","adminRolesId")
);

-- CreateTable
CREATE TABLE "public"."admin_roles" (
    "id" TEXT NOT NULL,
    "role" "public"."AdminRole" NOT NULL,

    CONSTRAINT "admin_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "username" VARCHAR(120) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "isVerified" BOOLEAN DEFAULT false,
    "twoFactorSecret" TEXT,
    "twoFactorEnabled" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blocks" (
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
CREATE TABLE "public"."chats" (
    "id" TEXT NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "tradeId" TEXT NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cryptocurrency_chains" (
    "id" TEXT NOT NULL,
    "cryptocurrencyId" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "contractAddress" VARCHAR(200),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "abiId" TEXT,

    CONSTRAINT "cryptocurrency_chains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cryptocurrencies" (
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
CREATE TABLE "public"."feedbacks" (
    "id" TEXT NOT NULL,
    "traderId" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "type" "public"."FeedbackType" NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fiats" (
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
CREATE TABLE "public"."uploaded_files" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "mimeType" TEXT,
    "size" INTEGER,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "uploaded_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."kycs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."KYCStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "documentType" "public"."KYCDocumentType" NOT NULL,
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
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "kycs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."languages" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chains" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "rpcUrl" TEXT,
    "explorerUrl" TEXT,
    "nativeCurrency" TEXT NOT NULL,
    "isTestnet" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "logoUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "chains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."offers" (
    "id" TEXT NOT NULL,
    "offerType" TEXT NOT NULL,
    "pricingType" TEXT NOT NULL,
    "listAt" DECIMAL(30,10) NOT NULL,
    "limitMin" DECIMAL(30,10) NOT NULL,
    "limitMax" DECIMAL(30,10) NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    "tags" TEXT[],
    "label" TEXT NOT NULL,
    "terms" TEXT NOT NULL,
    "averageTradeSpeed" INTEGER,
    "instructions" TEXT NOT NULL,
    "kycOnly" BOOLEAN NOT NULL DEFAULT false,
    "chainId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "vendorId" TEXT NOT NULL,
    "vendorWalletId" TEXT NOT NULL,
    "cryptocurrencyId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "paymentDetailsId" TEXT NOT NULL,
    "fiatId" TEXT NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_methods" (
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
CREATE TABLE "public"."payment_method_categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "payment_method_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_receipts" (
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
CREATE TABLE "public"."payment_details" (
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
CREATE TABLE "public"."premium_purchases" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payerWalletId" TEXT NOT NULL,
    "expectedAmount" DECIMAL(30,10) NOT NULL,
    "status" "public"."PremiumPurchaseStatus" NOT NULL,
    "period" "public"."PremiumPeriod" NOT NULL,
    "blockchainTransactionHash" TEXT NOT NULL,
    "blockchainPaymentHash" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "premium_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."referrals" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "refereeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."system_messages" (
    "id" TEXT NOT NULL,
    "type" "public"."SystemMessageType" NOT NULL,
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
CREATE TABLE "public"."tiers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "tradingFee" DECIMAL(10,8) NOT NULL,
    "discount" DECIMAL(10,8) NOT NULL,
    "volume" DECIMAL(30,10) NOT NULL,
    "requiredXP" INTEGER NOT NULL,

    CONSTRAINT "tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."smart_contracts" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "deployedById" TEXT NOT NULL,
    "deployerWalletId" TEXT NOT NULL,
    "platformWalletId" TEXT NOT NULL,
    "deploymentHash" TEXT,
    "deploymentBlockHeight" BIGINT,
    "gasUsed" BIGINT,
    "gasPrice" BIGINT,
    "deployedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "artifactId" TEXT NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "smart_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trade_escrow_details" (
    "id" TEXT NOT NULL,
    "arbitratorWalletId" TEXT NOT NULL,
    "buyerWalletId" TEXT NOT NULL,
    "sellerWalletId" TEXT NOT NULL,
    "feeRate" DECIMAL(10,8) NOT NULL,
    "profitMargin" DECIMAL(10,8) NOT NULL,
    "tradeDurationInSeconds" INTEGER NOT NULL,
    "tradeAmount" DECIMAL(38,18) NOT NULL,
    "buyerCollateral" DECIMAL(38,18) NOT NULL,
    "sellerCollateral" DECIMAL(38,18) NOT NULL,
    "sellerTotalFund" DECIMAL(38,18) NOT NULL,
    "blockchainTradeId" TEXT NOT NULL,
    "blockchainTransactionHash" TEXT,

    CONSTRAINT "trade_escrow_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trades" (
    "id" TEXT NOT NULL,
    "paymentReceiptId" TEXT,
    "vendorId" TEXT NOT NULL,
    "vendorWalletId" TEXT,
    "traderId" TEXT NOT NULL,
    "traderWalletId" TEXT,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "cryptocurrencyId" TEXT NOT NULL,
    "fiatId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "cryptocurrencyAmount" DECIMAL(38,18) NOT NULL,
    "fiatAmount" DECIMAL(30,10) NOT NULL,
    "exchangeRate" DECIMAL(30,10) NOT NULL,
    "startedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP,
    "expiredAt" TIMESTAMP,
    "disputedAt" TIMESTAMP,
    "status" "public"."TradeStatus" NOT NULL,
    "paidAt" TIMESTAMP,
    "fundedAt" TIMESTAMP,
    "vendorRejectedFunding" BOOLEAN NOT NULL DEFAULT false,
    "traderRejectedFunding" BOOLEAN NOT NULL DEFAULT false,
    "sellerFundedAt" TIMESTAMP,
    "buyerFundedAt" TIMESTAMP,
    "paymentConfirmedAt" TIMESTAMP,
    "escrowReleasedAt" TIMESTAMP,
    "blockchainTradeId" BIGINT,
    "blockchainTransactionHash" TEXT,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "tradeEscrowDetailsId" TEXT,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dispute_party_notes" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_party_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dispute_audit_logs" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "changedById" TEXT,
    "action" "public"."DisputeAction" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dispute_evidences" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "submittedById" TEXT NOT NULL,
    "type" "public"."EvidenceType" NOT NULL,
    "fileId" TEXT,
    "textContent" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_evidences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dispute_evidence_requests" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "requestedFromId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP,
    "submittedAt" TIMESTAMP,
    "status" "public"."EvidenceRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "dispute_evidence_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trade_disputes" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "raisedById" TEXT NOT NULL,
    "type" "public"."DisputeType" NOT NULL,
    "vendorStatement" TEXT DEFAULT '',
    "traderStatement" TEXT DEFAULT '',
    "severity" "public"."DisputeSeverity" NOT NULL,
    "status" "public"."DisputeStatus" NOT NULL,
    "resolutionNote" TEXT,
    "resolutionType" "public"."DisputeResolutionType",
    "resolvedAt" TIMESTAMP,
    "moderatorId" TEXT,
    "priority" "public"."DisputePriority" NOT NULL DEFAULT 'MEDIUM',
    "slaDueAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "winnerId" TEXT,
    "loserId" TEXT,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "trade_disputes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trusts" (
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
CREATE TABLE "public"."user_stats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalDisputes" INTEGER NOT NULL DEFAULT 0,
    "disputesLost" INTEGER NOT NULL DEFAULT 0,
    "fraudFlagged" BOOLEAN NOT NULL DEFAULT false,
    "lastDisputeDate" TIMESTAMP,

    CONSTRAINT "user_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_languages" (
    "userId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "user_languages_pkey" PRIMARY KEY ("userId","languageId")
);

-- CreateTable
CREATE TABLE "public"."user_suspensions" (
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
CREATE TABLE "public"."user_suspension_logs" (
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
CREATE TABLE "public"."user_warnings" (
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
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "profileColor" VARCHAR(10) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "username" VARCHAR(120) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" TEXT NOT NULL,
    "privateKeys" TEXT[],
    "isVerified" BOOLEAN DEFAULT false,
    "underReview" BOOLEAN NOT NULL DEFAULT false,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "tradeVolume" DECIMAL(30,10),
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
CREATE TABLE "public"."account_reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT NOT NULL,
    "reviewerId" TEXT,
    "relatedDisputeId" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP,
    "resolutionNote" TEXT,

    CONSTRAINT "account_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_moderation_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "public"."ModerationAction" NOT NULL,
    "message" TEXT,
    "relatedReviewId" TEXT,
    "moderatorId" TEXT,
    "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_moderation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "adminId" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."platform_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "public"."SettingType" NOT NULL DEFAULT 'STRING',
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,
    "canBeDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isEditable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wallets" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_wallets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "user_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin_wallets" (
    "id" TEXT NOT NULL,
    "isArbitrator" BOOLEAN NOT NULL DEFAULT false,
    "adminId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "admin_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."banners" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "targetWebsite" TEXT NOT NULL,
    "pages" TEXT[],
    "type" "public"."BannerType" NOT NULL,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "publishedById" TEXT NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_DisputeEvidenceToDisputeEvidenceRequest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DisputeEvidenceToDisputeEvidenceRequest_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "accepted_cryptocurrencies_coingeckoId_key" ON "public"."accepted_cryptocurrencies"("coingeckoId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "public"."admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_blockerId_blockedId_key" ON "public"."blocks"("blockerId", "blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "chats_tradeId_key" ON "public"."chats"("tradeId");

-- CreateIndex
CREATE UNIQUE INDEX "cryptocurrency_chains_cryptocurrencyId_chainId_key" ON "public"."cryptocurrency_chains"("cryptocurrencyId", "chainId");

-- CreateIndex
CREATE UNIQUE INDEX "cryptocurrencies_coingeckoId_key" ON "public"."cryptocurrencies"("coingeckoId");

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_tradeId_key" ON "public"."feedbacks"("tradeId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_userId_key" ON "public"."kycs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_documentFrontId_key" ON "public"."kycs"("documentFrontId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_documentBackId_key" ON "public"."kycs"("documentBackId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_selfieId_key" ON "public"."kycs"("selfieId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_utilityBillId_key" ON "public"."kycs"("utilityBillId");

-- CreateIndex
CREATE UNIQUE INDEX "kycs_bankStatementId_key" ON "public"."kycs"("bankStatementId");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "public"."languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "chains_name_key" ON "public"."chains"("name");

-- CreateIndex
CREATE UNIQUE INDEX "chains_chainId_key" ON "public"."chains"("chainId");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_blockchainTransactionHash_key" ON "public"."premium_purchases"("blockchainTransactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_blockchainPaymentHash_key" ON "public"."premium_purchases"("blockchainPaymentHash");

-- CreateIndex
CREATE INDEX "premium_purchases_userId_period_status_expiresAt_idx" ON "public"."premium_purchases"("userId", "period", "status", "expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "premium_purchases_userId_period_status_key" ON "public"."premium_purchases"("userId", "period", "status");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_refereeId_key" ON "public"."referrals"("refereeId");

-- CreateIndex
CREATE INDEX "referrals_referrerId_idx" ON "public"."referrals"("referrerId");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_name_key" ON "public"."tiers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_level_key" ON "public"."tiers"("level");

-- CreateIndex
CREATE INDEX "smart_contracts_address_idx" ON "public"."smart_contracts"("address");

-- CreateIndex
CREATE UNIQUE INDEX "dispute_evidences_fileId_key" ON "public"."dispute_evidences"("fileId");

-- CreateIndex
CREATE INDEX "dispute_evidence_requests_disputeId_requestedFromId_idx" ON "public"."dispute_evidence_requests"("disputeId", "requestedFromId");

-- CreateIndex
CREATE UNIQUE INDEX "trade_disputes_tradeId_key" ON "public"."trade_disputes"("tradeId");

-- CreateIndex
CREATE INDEX "trade_disputes_status_priority_idx" ON "public"."trade_disputes"("status", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "trusts_trusterId_trustedId_key" ON "public"."trusts"("trusterId", "trustedId");

-- CreateIndex
CREATE UNIQUE INDEX "user_stats_userId_key" ON "public"."user_stats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_suspensions_userId_key" ON "public"."user_suspensions"("userId");

-- CreateIndex
CREATE INDEX "user_warnings_userId_idx" ON "public"."user_warnings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_privateKeys_key" ON "public"."users"("privateKeys");

-- CreateIndex
CREATE UNIQUE INDEX "users_referralCode_key" ON "public"."users"("referralCode");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "public"."users"("username");

-- CreateIndex
CREATE INDEX "account_reviews_status_idx" ON "public"."account_reviews"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_token_key" ON "public"."tokens"("id", "token");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "public"."refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "platform_settings_key_key" ON "public"."platform_settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_address_key" ON "public"."wallets"("address");

-- CreateIndex
CREATE UNIQUE INDEX "user_wallets_userId_walletId_key" ON "public"."user_wallets"("userId", "walletId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_wallets_adminId_walletId_key" ON "public"."admin_wallets"("adminId", "walletId");

-- CreateIndex
CREATE INDEX "_DisputeEvidenceToDisputeEvidenceRequest_B_index" ON "public"."_DisputeEvidenceToDisputeEvidenceRequest"("B");

-- AddForeignKey
ALTER TABLE "public"."admin_admin_role" ADD CONSTRAINT "admin_admin_role_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."admin_admin_role" ADD CONSTRAINT "admin_admin_role_adminRolesId_fkey" FOREIGN KEY ("adminRolesId") REFERENCES "public"."admin_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blocks" ADD CONSTRAINT "blocks_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blocks" ADD CONSTRAINT "blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "public"."trades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cryptocurrency_chains" ADD CONSTRAINT "cryptocurrency_chains_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "public"."cryptocurrencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cryptocurrency_chains" ADD CONSTRAINT "cryptocurrency_chains_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "public"."chains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cryptocurrency_chains" ADD CONSTRAINT "cryptocurrency_chains_abiId_fkey" FOREIGN KEY ("abiId") REFERENCES "public"."uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."feedbacks" ADD CONSTRAINT "feedbacks_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."feedbacks" ADD CONSTRAINT "feedbacks_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "public"."trades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."kycs" ADD CONSTRAINT "kycs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."kycs" ADD CONSTRAINT "kycs_documentFrontId_fkey" FOREIGN KEY ("documentFrontId") REFERENCES "public"."uploaded_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."kycs" ADD CONSTRAINT "kycs_documentBackId_fkey" FOREIGN KEY ("documentBackId") REFERENCES "public"."uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."kycs" ADD CONSTRAINT "kycs_selfieId_fkey" FOREIGN KEY ("selfieId") REFERENCES "public"."uploaded_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."kycs" ADD CONSTRAINT "kycs_utilityBillId_fkey" FOREIGN KEY ("utilityBillId") REFERENCES "public"."uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."kycs" ADD CONSTRAINT "kycs_bankStatementId_fkey" FOREIGN KEY ("bankStatementId") REFERENCES "public"."uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."kycs" ADD CONSTRAINT "kycs_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offers" ADD CONSTRAINT "offers_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "public"."chains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offers" ADD CONSTRAINT "offers_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offers" ADD CONSTRAINT "offers_vendorWalletId_fkey" FOREIGN KEY ("vendorWalletId") REFERENCES "public"."user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offers" ADD CONSTRAINT "offers_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "public"."cryptocurrencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offers" ADD CONSTRAINT "offers_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offers" ADD CONSTRAINT "offers_paymentDetailsId_fkey" FOREIGN KEY ("paymentDetailsId") REFERENCES "public"."payment_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offers" ADD CONSTRAINT "offers_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "public"."fiats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_methods" ADD CONSTRAINT "payment_methods_paymentMethodCategoryId_fkey" FOREIGN KEY ("paymentMethodCategoryId") REFERENCES "public"."payment_method_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_details" ADD CONSTRAINT "payment_details_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_details" ADD CONSTRAINT "payment_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."premium_purchases" ADD CONSTRAINT "premium_purchases_payerWalletId_fkey" FOREIGN KEY ("payerWalletId") REFERENCES "public"."user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."premium_purchases" ADD CONSTRAINT "premium_purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."referrals" ADD CONSTRAINT "referrals_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."referrals" ADD CONSTRAINT "referrals_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."system_messages" ADD CONSTRAINT "system_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."smart_contracts" ADD CONSTRAINT "smart_contracts_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "public"."chains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."smart_contracts" ADD CONSTRAINT "smart_contracts_deployedById_fkey" FOREIGN KEY ("deployedById") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."smart_contracts" ADD CONSTRAINT "smart_contracts_deployerWalletId_fkey" FOREIGN KEY ("deployerWalletId") REFERENCES "public"."admin_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."smart_contracts" ADD CONSTRAINT "smart_contracts_platformWalletId_fkey" FOREIGN KEY ("platformWalletId") REFERENCES "public"."admin_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."smart_contracts" ADD CONSTRAINT "smart_contracts_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "public"."uploaded_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trade_escrow_details" ADD CONSTRAINT "trade_escrow_details_arbitratorWalletId_fkey" FOREIGN KEY ("arbitratorWalletId") REFERENCES "public"."admin_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trade_escrow_details" ADD CONSTRAINT "trade_escrow_details_buyerWalletId_fkey" FOREIGN KEY ("buyerWalletId") REFERENCES "public"."user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trade_escrow_details" ADD CONSTRAINT "trade_escrow_details_sellerWalletId_fkey" FOREIGN KEY ("sellerWalletId") REFERENCES "public"."user_wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_paymentReceiptId_fkey" FOREIGN KEY ("paymentReceiptId") REFERENCES "public"."payment_receipts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_vendorWalletId_fkey" FOREIGN KEY ("vendorWalletId") REFERENCES "public"."user_wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_traderWalletId_fkey" FOREIGN KEY ("traderWalletId") REFERENCES "public"."user_wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "public"."offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "public"."cryptocurrencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "public"."fiats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trades" ADD CONSTRAINT "trades_tradeEscrowDetailsId_fkey" FOREIGN KEY ("tradeEscrowDetailsId") REFERENCES "public"."trade_escrow_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_party_notes" ADD CONSTRAINT "dispute_party_notes_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "public"."trade_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_party_notes" ADD CONSTRAINT "dispute_party_notes_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_party_notes" ADD CONSTRAINT "dispute_party_notes_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_audit_logs" ADD CONSTRAINT "dispute_audit_logs_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "public"."trade_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_audit_logs" ADD CONSTRAINT "dispute_audit_logs_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_evidences" ADD CONSTRAINT "dispute_evidences_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "public"."trade_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_evidences" ADD CONSTRAINT "dispute_evidences_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_evidences" ADD CONSTRAINT "dispute_evidences_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_evidence_requests" ADD CONSTRAINT "dispute_evidence_requests_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "public"."trade_disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_evidence_requests" ADD CONSTRAINT "dispute_evidence_requests_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispute_evidence_requests" ADD CONSTRAINT "dispute_evidence_requests_requestedFromId_fkey" FOREIGN KEY ("requestedFromId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trade_disputes" ADD CONSTRAINT "trade_disputes_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "public"."trades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trade_disputes" ADD CONSTRAINT "trade_disputes_raisedById_fkey" FOREIGN KEY ("raisedById") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trade_disputes" ADD CONSTRAINT "trade_disputes_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trade_disputes" ADD CONSTRAINT "trade_disputes_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trade_disputes" ADD CONSTRAINT "trade_disputes_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trusts" ADD CONSTRAINT "trusts_trusterId_fkey" FOREIGN KEY ("trusterId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trusts" ADD CONSTRAINT "trusts_trustedId_fkey" FOREIGN KEY ("trustedId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_stats" ADD CONSTRAINT "user_stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_languages" ADD CONSTRAINT "user_languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_languages" ADD CONSTRAINT "user_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_suspensions" ADD CONSTRAINT "user_suspensions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_suspensions" ADD CONSTRAINT "user_suspensions_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_suspensions" ADD CONSTRAINT "user_suspensions_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "public"."trade_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_suspensions" ADD CONSTRAINT "user_suspensions_liftedById_fkey" FOREIGN KEY ("liftedById") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_suspension_logs" ADD CONSTRAINT "user_suspension_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_suspension_logs" ADD CONSTRAINT "user_suspension_logs_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_suspension_logs" ADD CONSTRAINT "user_suspension_logs_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "public"."trade_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_warnings" ADD CONSTRAINT "user_warnings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_warnings" ADD CONSTRAINT "user_warnings_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_warnings" ADD CONSTRAINT "user_warnings_relatedDisputeId_fkey" FOREIGN KEY ("relatedDisputeId") REFERENCES "public"."trade_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "public"."tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account_reviews" ADD CONSTRAINT "account_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account_reviews" ADD CONSTRAINT "account_reviews_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account_reviews" ADD CONSTRAINT "account_reviews_relatedDisputeId_fkey" FOREIGN KEY ("relatedDisputeId") REFERENCES "public"."trade_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_wallets" ADD CONSTRAINT "user_wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_wallets" ADD CONSTRAINT "user_wallets_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."admin_wallets" ADD CONSTRAINT "admin_wallets_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."admin_wallets" ADD CONSTRAINT "admin_wallets_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."banners" ADD CONSTRAINT "banners_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DisputeEvidenceToDisputeEvidenceRequest" ADD CONSTRAINT "_DisputeEvidenceToDisputeEvidenceRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."dispute_evidences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DisputeEvidenceToDisputeEvidenceRequest" ADD CONSTRAINT "_DisputeEvidenceToDisputeEvidenceRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."dispute_evidence_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
