import { Request, Response } from 'express';
import { getABI, getABIs } from '@/services/blockchains/wallet';

import { IS_DEVELOPMENT } from '@/constants';
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

export const saveABIs = async (req: Request, res: Response) => {
  try {
    const abis = await getABIs();

    res.status(200).json({ abis });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
