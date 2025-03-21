import { Request, Response } from 'express';
import {
  createTrade,
  getCryptocurrency,
  getFiat,
  getTrade,
  getUser,
  updateTrade,
} from 'base-ca';

import { calculateTradingFee } from '@/utils/fees';
import { getCoinPrice } from '@/services/coinGecko';

export async function index(req: Request, res: Response) {
  try {
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function createTradeController(req: Request, res: Response) {
  try {
    const { body } = req;

    const newTrade = await createTrade({
      where: { id: '' },
      update: {},
      create: { ...body },
    });

    res.status(200).send(newTrade);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function cancelTrade(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const trade = await updateTrade({
      where: { id: id },
      toUpdate: { status: 'CANCELLED', endedAt: new Date() },
    });

    res.status(200).send(trade);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function setPaidTrade(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const trade = await updateTrade({
      where: { id },
      toUpdate: { status: 'CANCELLED', endedAt: new Date() },
    });

    res.status(200).send(trade);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTradeController(req: Request, res: Response) {
  try {
    const { params } = req;
    const { id } = params;

    const trade = await getTrade({
      where: { id },
      select: {
        chat: true,
        cryptocurrency: true,
        fiat: true,
        offer: true,
        trader: true,
        vendor: true,
      },
    });

    if (!trade) {
      res.status(204).send();
    }

    // const safeTrade = safeTradeValuesAssigner(trade);

    res.status(200).send(trade);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const calculateReceivingAmount = async (req: Request, res: Response) => {
  try {
    const { userId, cryptocurrencyId, fiatId, fiatAmount } = req.query;
    const user = await getUser({
      where: { id: userId as string },
      select: {
        tier: { select: { level: true, tradingFee: true } },
        isPremium: true,
      },
    });
    const fiat = await getFiat({
      where: { id: fiatId as string },
      select: { symbol: true },
    });
    const cryptocurrency = await getCryptocurrency({
      where: { id: cryptocurrencyId as string },
      select: {
        coingeckoId: true,
      },
    });

    const currentPrice = await getCoinPrice(
      cryptocurrency!.coingeckoId,
      fiat!.symbol,
    );

    console.log({ currentPrice });

    // const buyerFee = calculateTradingFee({});

    // if (user?.isPremium) {
    // }
    // console.log({ feeRate });

    res.status(200).send({ ok: true });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
};
