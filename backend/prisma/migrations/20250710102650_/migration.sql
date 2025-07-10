/*
  Warnings:

  - You are about to drop the column `deploymentBlock` on the `smart_contracts` table. All the data in the column will be lost.
  - Added the required column `deploymentBlockHeight` to the `smart_contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "smart_contracts" DROP COLUMN "deploymentBlock",
ADD COLUMN     "deploymentBlockHeight" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
