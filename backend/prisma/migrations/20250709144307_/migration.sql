/*
  Warnings:

  - Added the required column `deployerAddress` to the `smart_contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deploymentBlock` to the `smart_contracts` table without a default value. This is not possible if the table is not empty.
  - Made the column `deployedById` on table `smart_contracts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deploymentTx` on table `smart_contracts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "smart_contracts" DROP CONSTRAINT "smart_contracts_deployedById_fkey";

-- AlterTable
ALTER TABLE "smart_contracts" ADD COLUMN     "deployerAddress" TEXT NOT NULL,
ADD COLUMN     "deploymentBlock" TEXT NOT NULL,
ALTER COLUMN "deployedById" SET NOT NULL,
ALTER COLUMN "deploymentTx" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "smart_contracts" ADD CONSTRAINT "smart_contracts_deployedById_fkey" FOREIGN KEY ("deployedById") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
