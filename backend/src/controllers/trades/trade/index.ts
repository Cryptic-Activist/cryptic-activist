import { Request, Response } from 'express';

import { CalculateReceivingAmountQueries } from './types';
import { Chat } from '@/socket/handlers';
import ChatMessage from '@/models/ChatMessage';
import { DEFAULT_PREMIUM_DISCOUNT } from '@/constants/env';
import { getCoinPrice } from '@/services/coinGecko';
import { prisma } from '@/services/db';

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

    const cryptocurrency = await prisma.cryptocurrency.findFirst({
      where: { id: body.cryptocurrencyId },
      select: {
        coingeckoId: true,
      },
    });
    const fiat = await prisma.fiat.findFirst({
      where: { id: body.fiatId },
      select: {
        symbol: true,
      },
    });

    const exchangeRate = await getCoinPrice(
      cryptocurrency?.coingeckoId!,
      fiat?.symbol!,
    );

    const newTrade = await prisma.trade.create({
      data: {
        traderId: body.traderId,
        vendorId: body.vendorId,
        offerId: body.offerId,
        cryptocurrencyId: body.cryptocurrencyId,
        fiatId: body.fiatId,
        cryptocurrencyAmount: body.cryptocurrencyAmount,
        fiatAmount: body.fiatAmount,
        status: 'PENDING',
        startedAt: new Date(),
        paymentMethodId: body.paymentMethodId,
        traderWalletAddress: body.traderWalletAddress,
        exchangeRate: exchangeRate,
      },
    });

    // const newPaymentDetails = await prisma.paymentDetails.create({
    //   data: {
    //     instructions: body.paymentDetails,
    //   },
    // });

    const newChat = await prisma.chat.create({
      data: {
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

    const trade = await prisma.trade.update({
      where: { id: id },
      data: { status: 'CANCELLED', endedAt: new Date() },
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

    const trade = await prisma.trade.findFirst({
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

    const trade = await prisma.trade.update({
      where: { id },
      data: { status: 'CANCELLED', endedAt: new Date() },
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

    const trade = await prisma.trade.findFirst({
      where: { id },
      select: {
        id: true,
        fiatAmount: true,
        cryptocurrencyAmount: true,
        paymentReceipt: true,
        status: true,
        escrowReleaseDate: true,
        paymentConfirmed: true,
        paid: true,
        expiredAt: true,
        startedAt: true,
        endedAt: true,
        blockchainTransactionHash: true,
        funded: true,
        createdAt: true,
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
            averageTradeSpeed: true,
            paymentMethod: true,
            paymentDetails: true,
            pricingType: true,
            createdAt: true,
            cryptocurrency: true,
            fiat: true,
            label: true,
            limitMax: true,
            limitMin: true,
            listAt: true,
          },
        },
        trader: {
          select: {
            _count: {
              select: {
                tradeTrader: {
                  where: {
                    status: 'COMPLETED',
                  },
                },
              },
            },
            id: true,
            profileColor: true,
            firstName: true,
            lastName: true,
            username: true,
            isPremium: true,
            lastLoginAt: true,
            kyc: true,
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

    const chat = await prisma.chat.findFirst({
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

    const user = await prisma.user.findFirst({
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

    const fiat = await prisma.fiat.findFirst({
      where: { id: fiatId as string },
      select: { symbol: true },
    });

    if (!fiat) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
      return;
    }

    const cryptocurrency = await prisma.cryptocurrency.findFirst({
      where: { id: cryptocurrencyId as string },
      select: {
        coingeckoId: true,
      },
    });

    if (!cryptocurrency) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
      return;
    }

    const tier = await prisma.tier.findFirst({
      where: { id: user?.tierId as string },
    });

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

    console.log({ finalCryptoAmount });

    res.status(200).send({
      fiatAmount,
      tradingFee,
      finalFiatAmount,
      currentPrice,
      finalCryptoAmount: parseFloat(finalCryptoAmount),
    });
    return;
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export async function getTradeDetails(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const tradeDetails = await prisma.trade.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        blockchainTransactionHash: true,
        createdAt: true,
        cryptocurrency: true,
        cryptocurrencyAmount: true,
        endedAt: true,
        escrowReleaseDate: true,
        expiredAt: true,
        fiat: true,
        fiatAmount: true,
        paymentMethod: {
          select: {
            name: true,
            paymentMethodCategory: {
              select: {
                name: true,
              },
            },
          },
        },
        paymentReceipt: true,
        startedAt: true,
        status: true,
        paymentConfirmed: true,
        paid: true,
        feedback: {
          select: {
            id: true,
            type: true,
            message: true,
            trader: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                profileColor: true,
              },
            },
          },
        },
        // paymentDetails: {
        //   select: {
        //     instructions: true,
        //   },
        // },
        trader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            profileColor: true,
          },
        },
        vendor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            profileColor: true,
          },
        },
        chat: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!tradeDetails) {
      res.status(400).send({
        errors: ['Trade not found'],
      });
      return;
    }

    let query = ChatMessage.find(
      { chatId: tradeDetails.chat?.id },
      'createdAt from message type to',
    );

    query = query.sort('desc');

    const chatMessages = await query.exec();

    res.status(200).send({
      tradeDetails,
      chatMessages,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function leaveFeedback(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { type, message } = req.body;

    const trade = await prisma.trade.findFirst({
      where: {
        id,
      },
      select: {
        offer: true,
        id: true,
        trader: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!trade) {
      res.status(400).send({
        errors: ['Trade not found'],
      });
      return;
    }

    console.log(
      JSON.stringify({
        data: {
          // either connect by relation…
          trader: {
            connect: { id: trade.trader.id },
          },
          trade: {
            connect: { id: trade.id },
          },
          message,
          type: type,
        },
      }),
      2,
    );

    const newFeedback = await prisma.feedback.create({
      data: {
        tradeId: trade.id,
        traderId: trade.trader.id,
        message,
        type: type,
      },
    });

    res.status(200).send({ ok: true });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
}
