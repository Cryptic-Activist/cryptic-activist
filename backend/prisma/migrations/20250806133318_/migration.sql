/*
  Warnings:

  - You are about to drop the column `artifactUrl` on the `smart_contracts` table. All the data in the column will be lost.
  - Added the required column `artifactId` to the `smart_contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."smart_contracts" DROP COLUMN "artifactUrl",
ADD COLUMN     "artifactId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);

-- AddForeignKey
ALTER TABLE "public"."smart_contracts" ADD CONSTRAINT "smart_contracts_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "public"."uploaded_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
