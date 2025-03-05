-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "cryptocurrencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "fiats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
