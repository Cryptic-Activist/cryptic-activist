-- CreateTable
CREATE TABLE "accepted_cryptocurrencies" (
    "id" TEXT NOT NULL,
    "coingeckoId" VARCHAR(200) NOT NULL,
    "symbol" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "accepted_cryptocurrencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accepted_cryptocurrencies_coingeckoId_key" ON "accepted_cryptocurrencies"("coingeckoId");
