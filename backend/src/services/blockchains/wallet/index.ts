import { chainEndpoints, chainMapping, curatedTokenAddresses } from './data';

import { ETHERSCAN_API_KEY } from '@/constants/env';
import { fetchGet } from '@/services/axios';

export const getABI = async (
  chain: string,
  contractAddress: string,
  apiKey: string,
) => {
  const endpoint = chainEndpoints[chain.toLowerCase()];
  if (!endpoint) throw new Error(`Unsupported chain: ${chain}`);

  const url = `${endpoint.url}/api?chainid=${endpoint.chainId}&module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`;
  try {
    const response = await fetchGet(url);
    if (response.data.status === '1') {
      return {
        abi: JSON.parse(response.data.result),
        chainId: endpoint.chainId,
      };
    } else {
      throw new Error(response.data.message || 'Failed to fetch ABI');
    }
  } catch (error) {
    return null;
  }
};

// Example usage
export const getABIs = async () => {
  const apiKey = ETHERSCAN_API_KEY;

  let abis: { [key: string]: any } = {};

  for (const [chain, chainKey] of Object.entries(chainMapping)) {
    const addresses = curatedTokenAddresses[chainKey] || [];
    if (addresses.length === 0) {
      continue;
    }

    for (const address of addresses) {
      const result = await getABI(chain, address, apiKey);
      if (result) {
        // abis.
        console.log(
          `${chain} ABI for ${address}:`,
          JSON.stringify(result.abi).slice(0, 100) + '...',
        );
      }
    }
  }
};
