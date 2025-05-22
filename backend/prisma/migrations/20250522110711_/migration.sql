/*
  Warnings:

  - You are about to alter the column `listAt` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `limitMin` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `limitMax` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `timeLimit` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `averageTradeSpeed` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `expectedAmount` on the `premium_purchases` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `tradingFee` on the `tiers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `discount` on the `tiers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `minVolume` on the `tiers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `cryptocurrencyAmount` on the `trades` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `fiatAmount` on the `trades` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,10)`.

*/
-- AlterTable
ALTER TABLE "offers" ALTER COLUMN "listAt" SET DATA TYPE DECIMAL(30,10),
ALTER COLUMN "limitMin" SET DATA TYPE DECIMAL(30,10),
ALTER COLUMN "limitMax" SET DATA TYPE DECIMAL(30,10),
ALTER COLUMN "timeLimit" DROP NOT NULL,
ALTER COLUMN "timeLimit" SET DATA TYPE DECIMAL(30,10),
ALTER COLUMN "averageTradeSpeed" SET DATA TYPE DECIMAL(30,10);

-- AlterTable
ALTER TABLE "premium_purchases" ALTER COLUMN "expectedAmount" SET DATA TYPE DECIMAL(30,10);

-- AlterTable
ALTER TABLE "tiers" ALTER COLUMN "tradingFee" SET DATA TYPE DECIMAL(30,10),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(30,10),
ALTER COLUMN "minVolume" SET DATA TYPE DECIMAL(30,10);

-- AlterTable
ALTER TABLE "trades" ALTER COLUMN "cryptocurrencyAmount" SET DATA TYPE DECIMAL(30,10),
ALTER COLUMN "fiatAmount" SET DATA TYPE DECIMAL(30,10);

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(30,10);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referralCode" SET DEFAULT substring(md5(gen_random_uuid()::text), 1, 16);
