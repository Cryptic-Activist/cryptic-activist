-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "blockchainTradeId" BIGINT,
ADD COLUMN     "blockchainTransactionHash" TEXT;
