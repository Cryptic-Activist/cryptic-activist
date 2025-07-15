/*
  Warnings:

  - You are about to drop the column `minVolume` on the `tiers` table. All the data in the column will be lost.
  - Added the required column `volume` to the `tiers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tiers" DROP COLUMN "minVolume",
ADD COLUMN     "volume" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
