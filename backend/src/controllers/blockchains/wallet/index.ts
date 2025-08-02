import { Request, Response } from 'express';

import { IS_DEVELOPMENT } from '@/constants';
import { getABI } from '@/services/blockchains/wallet';
import { prisma } from '@/services/db';

export const connectWallet = async (req: Request, res: Response) => {
  try {
    const { userId, address, type } = req.body;
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

export const getSuperAdminArbitratorWallets = async (
  req: Request,
  res: Response,
) => {
  try {
    const adminId = req.params.adminId as string;

    const adminWallets = await prisma.adminWallet.findMany({
      where: {
        adminId,
        isArbitrator: true,
        deletedAt: null,
      },
      select: {
        id: true,
        wallet: {
          select: {
            address: true,
          },
        },
      },
    });

    res.status(200).json(adminWallets);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserWallets = async (req: Request, res: Response) => {
  try {
    const usersWallet = await prisma.userWallet.findMany({
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        wallet: {
          select: {
            address: true,
          },
        },
      },
    });

    res.status(200).json(usersWallet);
  } catch (error) {
    res.status(400).json(error);
  }
};
