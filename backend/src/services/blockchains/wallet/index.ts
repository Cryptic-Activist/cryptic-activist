import { MORALIS_API_KEY } from '@/constants/env';
import Moralis from 'moralis';

export async function initMoralis() {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });
}

export async function getWalletBalances(
  address: string,
  chain: string = 'eth',
) {
  await initMoralis();

  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain, // e.g., 'eth', '0x89' for Polygon
  });

  const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  });

  return {
    native: nativeBalance.raw,
    tokens: tokenBalances.raw,
  };
}
