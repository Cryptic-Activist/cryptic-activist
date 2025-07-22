import { ETHERSCAN_API_KEY } from '@/constants/env';
import { fetchGet } from '@/services/axios';
import { response } from 'express';

export const getABI = async ({
  chainId,
  contractAddress,
  crypto,
  apiKey = ETHERSCAN_API_KEY,
}: {
  chainId: string;
  crypto: any;
  contractAddress: string;
  apiKey: string;
}) => {
  const endpointUrl = 'https://api.etherscan.io/v2';

  const url = `${endpointUrl}/api?chainid=${chainId}&module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`;

  try {
    const response = await fetchGet(url);

    if (response.data.status === '1') {
      return {
        abi: JSON.parse(response.data.result),
        chainId: chainId,
      };
    } else {
      throw new Error(response.data.message || 'Failed to fetch ABI');
    }
  } catch (error) {
    // console.log({ error });
    return null;
  }
};
