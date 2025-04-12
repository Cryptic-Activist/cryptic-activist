import { Request, Response } from 'express';
import {
  createChat,
  createTrade,
  getChat,
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
        traderWalletAddress: body.traderWalletAddress,
      },
    });

    const newChat = await createChat({
      where: { id: '' },
      update: {},
      create: {
        tradeId: newTrade.id,
      },
    });

    res.status(200).send({ trade: { ...newTrade }, chat: { ...newChat } });
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

export async function checkTradePaid(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const trade = await getTrade({
      where: { id },
    });

    if (!trade) {
      res.status(400).send({
        error: 'Trade not found',
      });
      return;
    }

    res.status(200).send({
      isPaid: trade?.paid,
    });
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
        id: true,
        fiatAmount: true,
        cryptocurrencyAmount: true,
        paymentReceipt: true,
        status: true,
        paid: true,
        paymentMethod: {
          select: {
            name: true,
          },
        },
        chat: {
          select: {
            id: true,
          },
        },
        cryptocurrency: {
          select: {
            coingeckoId: true,
            name: true,
            symbol: true,
            image: true,
          },
        },
        fiat: {
          select: {
            name: true,
            symbol: true,
            country: true,
          },
        },
        offer: {
          select: {
            id: true,
            tags: true,
            instructions: true,
            terms: true,
            offerType: true,
            timeLimit: true,
          },
        },
        trader: {
          select: {
            id: true,
            profileColor: true,
            firstName: true,
            lastName: true,
            username: true,
            isPremium: true,
            lastLoginAt: true,
          },
        },
        vendor: {
          select: {
            id: true,
            profileColor: true,
            firstName: true,
            lastName: true,
            username: true,
            isPremium: true,
            lastLoginAt: true,
          },
        },
      },
    });

    if (!trade) {
      res.status(204).send({ errors: ['Unable to retrieve trade'] });
      return;
    }

    const chat = await getChat({
      where: { tradeId: trade.id },
      select: {
        id: true,
      },
    });

    if (!chat) {
      res.status(204).send({ errors: ['Unable to retrieve chat'] });
      return;
    }

    res.status(200).send({ ...trade, chat });
  } catch (err) {
    console.log({ err });
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
      return;
    }

    const fiat = await getFiat({
      where: { id: fiatId as string },
      select: { symbol: true },
    });

    if (!fiat) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
      return;
    }

    const cryptocurrency = await getCryptocurrency({
      where: { id: cryptocurrencyId as string },
      select: {
        coingeckoId: true,
      },
    });

    if (!cryptocurrency) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
      return;
    }

    const tier = await getTier({ where: { id: user?.tierId as string } });

    if (!tier) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
      return;
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
