import { Request, Response } from 'express';
import {
  getBlockHeight,
  getCoinPrice,
  getGasPrice,
} from '@/services/coinGecko';

import { ethers } from 'ethers';
import { getEscrowContract } from '@/services/blockchains/escrow';
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

      if (!blockHeight) {
        throw new Error('Unable to find current block height');
      }

      const formatterUSD = Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const formatterBlockHeight = Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      return {
        chain: cryptocurrencyChain?.chain,
        gasPrice,
        blockHeight: formatterBlockHeight.format(blockHeight),
        price: formatterUSD.format(price),
      };
    });

    const currentContract = await prisma.smartContract.findFirst({
      where: {
        chainId: transactions?.chain.id,
        isActive: true,
      },
      orderBy: {
        deployedAt: 'desc',
      },
      select: {
        version: true,
      },
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
        name: true,
        deployedBy: {
          select: {
            username: true,
          },
        },
      },
    });

    res
      .status(200)
      .json({
        ...transactions,
        ...(currentContract && { currentContract }),
        ...(lastDeployedSmartContract && { lastDeployedSmartContract }),
      });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
