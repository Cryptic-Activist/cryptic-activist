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
        admin: {
          select: {
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

    res.status(200).json(adminWallets);
  } catch (error) {
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
};

export const createAdminWallet = async (req: Request, res: Response) => {
  try {
    const { walletAddress, adminId } = req.body;

    await prisma.$transaction(async (tx) => {
      const admin = await tx.admin.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!admin) {
        throw new Error('Unable to find admin');
      }

      let wallet = await tx.wallet.findFirst({
        where: {
          address: walletAddress,
        },
        select: {
          address: true,
          id: true,
        },
      });

      if (!wallet) {
        wallet = await tx.wallet.create({
          data: {
            address: walletAddress,
          },
        });
      }

      await tx.adminWallet.create({
        data: {
          adminId,
          walletId: wallet.id,
        },
      });
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const softDeleteAdminWallet = async (req: Request, res: Response) => {
  try {
    const walletId = req.params.walletId as string;

    await prisma.adminWallet.update({
      where: {
        id: walletId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(400).json(error);
  }
};
