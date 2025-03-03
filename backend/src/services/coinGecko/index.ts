import { fetchGet } from '../../../../api-cryptocurrency-cryptic-activist/src/services/axios';

export const getCoinPrice = async (ids: string, fiatSymbol: string) => {
  const response = await fetchGet(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${fiatSymbol}`,
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};
