import { Request, Response } from 'express';
import {
  createTrade,
  getCryptocurrency,
  getFiat,
  getTier,
  getTrade,
  getUser,
  updateTrade,
} from 'base-ca';

import { CalculateReceivingAmountQueries } from './types';
import { DEFAULT_PREMIUM_DISCOUNT } from '@/constants/env';

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

    console.log({ body });

    const newTrade = await createTrade({
      where: { id: '' },
      update: {},
      create: {
        traderId: body.traderId,
        vendorId: body.vendorId,
        offerId: body.offerId,
        cryptocurrencyId: body.cryptocurrencyId,
        fiatId: body.fiatId,
        cryptocurrencyAmount: body.cryptocurrencyAmount,
        fiatAmount: body.fiatAmount,
        status: 'IN_PROGRESS',
        paymentMethodId: body.paymentMethodId,
      },
    });

    res.status(200).send(newTrade);
  } catch (err) {
    console.log({ err });
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

export const calculateReceivingAmount = async (
  req: Request<{}, {}, {}, CalculateReceivingAmountQueries>,
  res: Response,
) => {
  try {
    const { userId, cryptocurrencyId, fiatId, fiatAmount, currentPrice } =
      req.query;

    const parsedFiatAmount = parseFloat(fiatAmount);
    const parsedCurrentPrice = parseFloat(currentPrice);

    const user = await getUser({
      where: { id: userId as string },
      select: {
        isPremium: true,
        tierId: true,
      },
    });

    if (!user) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
    }

    const fiat = await getFiat({
      where: { id: fiatId as string },
      select: { symbol: true },
    });

    if (!fiat) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
    }

    const cryptocurrency = await getCryptocurrency({
      where: { id: cryptocurrencyId as string },
      select: {
        coingeckoId: true,
      },
    });

    if (!cryptocurrency) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
    }

    const tier = await getTier({ where: { id: user?.tierId as string } });

    if (!tier) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
    }

    let feeRate = tier?.tradingFee! - tier?.discount!;

    if (user?.isPremium) {
      feeRate -= DEFAULT_PREMIUM_DISCOUNT;
    }

    const tradingFee = parsedFiatAmount * feeRate;
    const finalFiatAmount = parsedFiatAmount - tradingFee;

    const finalCryptoAmount = (finalFiatAmount / parsedCurrentPrice).toFixed(8);

    res.status(200).send({
      fiatAmount,
      tradingFee,
      finalFiatAmount,
      currentPrice,
      finalCryptoAmount: parseFloat(finalCryptoAmount),
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
};
