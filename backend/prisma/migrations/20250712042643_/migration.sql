/*
  Warnings:

  - You are about to drop the column `artifactUrl` on the `smart_contracts` table. All the data in the column will be lost.
  - Added the required column `artifactUrl` to the `smart_contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "smart_contracts" DROP COLUMN "artifactUrl",
ADD COLUMN     "artifactUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
