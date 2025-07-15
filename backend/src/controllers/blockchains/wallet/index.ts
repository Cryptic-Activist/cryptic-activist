import { Request, Response } from 'express';

import { IS_DEVELOPMENT } from '@/constants';
import { getWalletBalances } from '@/services/blockchains/wallet';
import { prisma } from '@/services/db';

export const connectWallet = async (req: Request, res: Response) => {
  try {
    const { userId, address, type } = req.body;

    // const newWallet = await createWallet({
    //   where: { address },
    //   update: {},
    //   create: {
    //     userId,
    //     address,
    //     type,
    //   },
    // });

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getSupportedChains = async (_req: Request, res: Response) => {
  try {
    const chains = await prisma.chain.findMany({
      where: {
        isTestnet: IS_DEVELOPMENT,
      },
    });
    res.status(200).json(chains);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getWalletBalancesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const chainId = req.params.chainId as string;
    const walletAddress = req.params.walletAddress as string;

    const chain = await prisma.chain.findUnique({
      where: {
        chainId: parseInt(chainId),
      },
      select: {
        chainId: true,
      },
    });

    if (!chain) {
      res.status(400).json({ error: 'Unable to find chain' });
      return;
    }

    const balances = await getWalletBalances(walletAddress, chainId);

    res.status(200).json(balances);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
