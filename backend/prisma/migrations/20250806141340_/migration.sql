/*
  Warnings:

  - You are about to drop the column `abiUrl` on the `cryptocurrency_chains` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."cryptocurrency_chains" DROP COLUMN "abiUrl",
ADD COLUMN     "abiId" TEXT;

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "public"."cryptocurrency_chains" ADD CONSTRAINT "cryptocurrency_chains_abiId_fkey" FOREIGN KEY ("abiId") REFERENCES "public"."uploaded_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
