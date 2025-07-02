import { Request, Response } from 'express';

import { IS_DEVELOPMENT } from '@/constants';
import { SUPPORTED_CHAIN_IDS } from '@/constants/blockchains';
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
    const chains = await prisma.cryptocurrencyChain.findMany({
      where: {
        chain: {
          isTestnet: IS_DEVELOPMENT,
        },
      },
      select: {
        chain: true,
        cryptocurrency: true,
      },
    });
    console.log(chains);
    res.status(200).json(SUPPORTED_CHAIN_IDS);
  } catch (error) {
    res.status(500).json({ error });
  }
};
