import { z } from 'zod';

export const GetPrice = z.object({
  id: z.string(),
  fiatSymbol: z.string(),
});

export const CreateCryptocurrencyCoinGecko = z.object({
  coingeckoId: z.string(),
});

export const GetCryptocurrency = z.object({ cryptocurrencySymbol: z.string() });
