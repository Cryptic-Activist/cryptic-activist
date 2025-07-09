-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- CreateTable
CREATE TABLE "smart_contracts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "deployedById" TEXT,
    "deploymentTx" TEXT,
    "deployedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "abiUrl" TEXT NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "smart_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "smart_contracts_address_idx" ON "smart_contracts"("address");

-- AddForeignKey
ALTER TABLE "smart_contracts" ADD CONSTRAINT "smart_contracts_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smart_contracts" ADD CONSTRAINT "smart_contracts_deployedById_fkey" FOREIGN KEY ("deployedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
