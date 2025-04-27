import { Request, Response } from 'express';

import { prisma } from '@/services/db';

export async function getTradesByUserAsVendor(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const trades = await prisma.trade.findMany({
      where: {
        vendor: {
          id: userId,
        },
      },
      select: {
        id: true,
        cryptocurrency: true,
        cryptocurrencyAmount: true,
        fiat: true,
        fiatAmount: true,
        endedAt: true,
        escrowReleaseDate: true,
        status: true,
        blockchainTransactionHash: true,
      },
    });

    res.status(200).send(trades);
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTradesByUserAsTrader(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const trades = await prisma.trade.findMany({
      where: {
        trader: {
          id: userId,
        },
      },
      select: {
        id: true,
        cryptocurrency: true,
        cryptocurrencyAmount: true,
        fiat: true,
        fiatAmount: true,
        endedAt: true,
        escrowReleaseDate: true,
        status: true,
        blockchainTransactionHash: true,
      },
    });

    res.status(200).send(trades);
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
}
