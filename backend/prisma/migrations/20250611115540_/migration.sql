-- CreateEnum
CREATE TYPE "DisputeResolutionType" AS ENUM ('RELEASE_CRYPTO', 'REFUND_PAYMENT', 'CANCEL_TRADE', 'PARTIAL_REFUND', 'SPLIT_RESOLUTION', 'NO_ACTION_TAKEN', 'OFF_PLATFORM_DECISION', 'PLATFORM_COMPENSATION');

-- AlterTable
ALTER TABLE "trade_disputes" ADD COLUMN     "resolutionType" "DisputeResolutionType";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
