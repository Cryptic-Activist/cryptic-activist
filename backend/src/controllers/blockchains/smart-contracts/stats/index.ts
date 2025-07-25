import { Request, Response, response } from 'express';
import { formatBigInt, parseSafeResponse } from '@/utils/number';
import {
  getBlockHeight,
  getCoinPrice,
  getGasPrice,
} from '@/services/coinGecko';

import { prisma } from '@/services/db';

export const getDeploymentStats = async (req: Request, res: Response) => {
  try {
    const chainId = req.params.chainId as string;

    const transactions = await prisma.$transaction(async (tx) => {
      const cryptocurrencyChain = await tx.cryptocurrencyChain.findFirst({
        where: {
          chainId: chainId,
        },
        select: {
          chain: {
            select: {
              id: true,
              name: true,
              chainId: true,
              rpcUrl: true,
            },
          },
          cryptocurrency: {
            select: {
              symbol: true,
              coingeckoId: true,
            },
          },
        },
      });

      if (!cryptocurrencyChain?.chain.rpcUrl) {
        throw new Error('Unable to find chain RPC URL');
      }

      const gasPrice = await getGasPrice(cryptocurrencyChain?.chain?.rpcUrl);

      if (!cryptocurrencyChain.cryptocurrency?.coingeckoId) {
        throw new Error('Unable to find cryptocurrency');
      }

      const price = await getCoinPrice(
        cryptocurrencyChain.cryptocurrency.coingeckoId,
        'usd',
      );

      if (!price) {
        throw new Error('Unable to get price');
      }

      const blockHeight = await getBlockHeight(
        cryptocurrencyChain?.chain?.rpcUrl,
      );

      if (blockHeight === undefined || blockHeight === null) {
        throw new Error('Unable to find current block height');
      }

      const formatterUSD = Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return {
        chain: cryptocurrencyChain?.chain,
        gasPrice: gasPrice,
        blockHeight: formatBigInt(blockHeight),
        price: formatterUSD.format(price),
      };
    });

    const lastDeployedSmartContract = await prisma.smartContract.findFirst({
      where: {
        chainId: transactions.chain?.id,
      },
      orderBy: {
        deployedAt: 'desc',
      },
      select: {
        deployedAt: true,
        version: true,
        deploymentBlockHeight: true,
        gasPrice: true,
        gasUsed: true,
        metadata: true,
        chain: {
          select: {
            name: true,
          },
        },
        deployedBy: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!lastDeployedSmartContract) {
      const response = parseSafeResponse(transactions);

      res.status(200).json(response);
      return;
    }

    const { deploymentBlockHeight, gasPrice, gasUsed, ...rest } =
      lastDeployedSmartContract;

    const convertedGasPrice = formatBigInt(gasPrice);
    const convertedGasUsed = formatBigInt(gasUsed);
    const convertedDeploymentBlockHeight = formatBigInt(deploymentBlockHeight);

    const parsed = parseSafeResponse({
      ...transactions,
      lastDeployedSmartContract: {
        gasPrice: convertedGasPrice,
        gasUsed: convertedGasUsed,
        deploymentBlockHeight: convertedDeploymentBlockHeight,
        ...rest,
      },
    });

    res.status(200).json(parsed);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
