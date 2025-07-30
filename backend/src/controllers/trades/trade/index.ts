import { Decimal, prisma } from '@/services/db';
import { Request, Response } from 'express';

import { CalculateReceivingAmountQueries } from './types';
import { Chat } from '@/socket/handlers';
import ChatMessage from '@/models/ChatMessage';
import { DEFAULT_PREMIUM_DISCOUNT } from '@/constants/env';
import { fetchGet } from '@/services/axios';
import { getCoinPrice } from '@/services/coinGecko';
import { getSetting } from '@/utils/settings';
import { isUserPremium } from '@/utils/user';

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

    const transactions = await prisma.$transaction(async (tx) => {
      const offer = await tx.offer.findUnique({
        where: { id: body.offerId },
        select: { offerType: true, vendorId: true },
      });

      const sellerId =
        offer?.offerType === 'buy' ? offer.vendorId : body.traderId;
      const buyerId =
        offer?.offerType === 'sell' ? body.tradeId : offer?.vendorId;

      const newTrade = await tx.trade.create({
        data: {
          traderId: body.traderId,
          vendorId: body.vendorId,
          offerId: body.offerId,
          cryptocurrencyId: body.cryptocurrencyId,
          fiatId: body.fiatId,
          cryptocurrencyAmount: new Decimal(body.cryptocurrencyAmount),
          fiatAmount: new Decimal(body.fiatAmount),
          status: 'PENDING',
          startedAt: new Date(),
          paymentMethodId: body.paymentMethodId,
          traderWalletAddress: body.traderWalletAddress,
          exchangeRate: new Decimal(exchangeRate),
          buyerId,
          sellerId,
        },
      });

      const newChat = await tx.chat.create({
        data: {
          tradeId: newTrade.id,
        },
      });

      return { newTrade, newChat };
    });

    res.status(200).send({
      trade: { ...transactions.newTrade },
      chat: { ...transactions.newChat },
    });
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
      select: {
        paidAt: true,
      },
    });

    if (!trade) {
      res.status(400).send({
        error: 'Trade not found',
      });
      return;
    }

    res.status(200).send({
      isPaid: trade?.paidAt,
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
        escrowReleasedAt: true,
        paymentConfirmedAt: true,
        paidAt: true,
        expiredAt: true,
        startedAt: true,
        endedAt: true,
        fundedAt: true,
        disputedAt: true,
        blockchainTransactionHash: true,
        exchangeRate: true,
        createdAt: true,
        tradeEscrowDetails: true,
        traderWalletAddress: true,
        vendorWalletAddress: true,
        traderRejectedFunding: true,
        vendorRejectedFunding: true,
        buyerId: true,
        buyerFundedAt: true,
        sellerId: true,
        sellerFundedAt: true,
        tradeDispute: {
          select: {
            createdAt: true,
            id: true,
            raisedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
              },
            },
            type: true,
            resolutionNote: true,
            resolvedAt: true,
            moderator: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
              },
            },
          },
        },
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
            id: true,
            coingeckoId: true,
            name: true,
            symbol: true,
            image: true,
            chains: {
              where: {
                chain: {
                  offers: {
                    some: {
                      trades: {
                        some: {
                          id,
                        },
                      },
                    },
                  },
                },
              },
              select: {
                abiUrl: true,
                contractAddress: true,
              },
            },
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
            chain: true,
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

    const cryptocurrencyChain = await prisma.cryptocurrencyChain.findFirst({
      where: {
        cryptocurrencyId: trade.cryptocurrency.id,
        chainId: trade.offer.chain.id,
      },
      select: {
        abiUrl: true,
        contractAddress: true,
      },
    });

    let token: { [key: string]: any } = {
      address: cryptocurrencyChain?.contractAddress,
      abi: [],
    };

    if (cryptocurrencyChain?.abiUrl && cryptocurrencyChain?.contractAddress) {
      try {
        const response = await fetchGet(cryptocurrencyChain?.abiUrl);
        token.abi = response.data;
      } catch (error) {
        console.error('Error fetching ABI:', error);
      }
    }

    res.status(200).send({ ...trade, chat, token });
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
    const {
      userId,
      cryptocurrencyId,
      fiatId,
      fiatAmount,
      currentPrice,
      offerId,
      decimals,
    } = req.query;

    const parsedFiatAmount = new Decimal(fiatAmount);
    const parsedCurrentPrice = new Decimal(currentPrice);

    const user = await prisma.user.findFirst({
      where: { id: userId as string },
      select: {
        id: true,
        tierId: true,
      },
    });

    if (!user) {
      res.status(400).send({ error: ['Unable to calculate receiving amount'] });
      return;
    }

    const offer = await prisma.offer.findFirst({
      where: { id: offerId as string },
      select: {
        offerType: true,
      },
    });

    if (!offer) {
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

    let feeRate = tier.tradingFee.minus(tier?.discount ?? 0);

    const isPremium = await isUserPremium(user.id);

    if (isPremium) {
      const premiumDiscount = new Decimal(DEFAULT_PREMIUM_DISCOUNT);
      feeRate = feeRate.minus(premiumDiscount);
    }

    const tradingFee = parsedFiatAmount.times(feeRate);
    const finalFiatAmount = parsedFiatAmount.minus(tradingFee);
    const parsedDecimals = parseInt(decimals);

    // Calculate crypto amount
    const finalCryptoAmount = finalFiatAmount
      .dividedBy(parsedCurrentPrice)
      .toDecimalPlaces(parsedDecimals);

    let multiplier = 0;
    const depositPerTradePercent = await getSetting('depositPerTradePercent');

    if (!depositPerTradePercent) {
      res.status(400).send({ error: ['Deposit per trade percent not set'] });
      return;
    }

    if (offer.offerType === 'buy') {
      // Buyer needs only the deposit percentage (e.g., 20%)
      multiplier = depositPerTradePercent; // e.g., 0.2 → 2000
    } else {
      // Seller needs 100% + deposit percentage (e.g., 120%)
      multiplier = 1 + depositPerTradePercent; // e.g., 1.2 → 12000
    }

    const requiredBalance = finalCryptoAmount
      .times(multiplier)
      .toDecimalPlaces(parsedDecimals);

    console.log({
      fiatAmount: parsedFiatAmount.toString(),
      tradingFee: tradingFee.toString(),
      finalFiatAmount: finalFiatAmount.toString(),
      currentPrice: parsedCurrentPrice.toString(),
      finalCryptoAmount: finalCryptoAmount.toNumber(),
      requiredBalance: requiredBalance.toNumber(),
    });

    res.status(200).send({
      fiatAmount: parsedFiatAmount.toString(),
      tradingFee: tradingFee.toString(),
      finalFiatAmount: finalFiatAmount.toString(),
      currentPrice: parsedCurrentPrice.toString(),
      finalCryptoAmount: finalCryptoAmount.toNumber(),
      requiredBalance: requiredBalance.toNumber(),
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
        escrowReleasedAt: true,
        expiredAt: true,
        fiat: true,
        fiatAmount: true,
        tradeDispute: {
          select: {
            id: true,
            createdAt: true,
            type: true,
            resolvedAt: true,
            slaDueAt: true,
            disputeEvidenceRequest: true,
            winner: {
              select: {
                id: true,
                username: true,
              },
            },
            loser: {
              select: {
                id: true,
                username: true,
              },
            },
            status: true,
            raisedBy: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        offer: {
          select: {
            chain: true,
            paymentDetails: {
              select: {
                instructions: true,
              },
            },
          },
        },
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
        paymentConfirmedAt: true,
        paidAt: true,
        disputedAt: true,
        exchangeRate: true,
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
