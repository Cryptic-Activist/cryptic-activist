/*
  Warnings:

  - You are about to drop the column `name` on the `smart_contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "smart_contracts" DROP COLUMN "name",
ADD COLUMN     "gasPrice" BIGINT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
