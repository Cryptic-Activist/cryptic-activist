import { prisma } from '../db';

export const findOrCreateUserWallet = async (
  walletAddress: string,
  userId: string,
) => {
  let wallet = await prisma.wallet.findFirst({
    where: {
      address: walletAddress,
    },
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: {
        address: walletAddress,
      },
    });
  }

  let userWallet = await prisma.userWallet.findFirst({
    where: {
      userId,
      wallet: {
        address: wallet.address,
      },
    },
  });

  if (!userWallet) {
    userWallet = await prisma.userWallet.create({
      data: {
        userId,
        walletId: wallet.id,
      },
    });
  }

  return userWallet;
};

export const findOrCreateAdminWallet = async (
  walletAddress: string,
  adminId: string,
) => {
  let wallet = await prisma.wallet.findFirst({
    where: {
      address: walletAddress,
    },
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: {
        address: walletAddress,
      },
    });
  }

  let adminWallet = await prisma.adminWallet.findFirst({
    where: {
      adminId,
      wallet: {
        address: wallet.address,
      },
    },
  });

  if (!adminWallet) {
    adminWallet = await prisma.adminWallet.create({
      data: {
        adminId,
        walletId: wallet.id,
      },
    });
  }

  return adminWallet;
};
