import { Decimal, prisma } from '@/services/db';
import { Request, Response } from 'express';
import {
  getPremiumContract,
  getProvider,
} from '@/services/blockchains/premium';

import { ETHEREUM_PREMIUM_CONTRACT_ADDRESS } from '@/constants/env';
import { PremiumPeriod } from '@prisma/client';
import { findOrCreateUserWallet } from '@/services/wallet';
import { getSetting } from '@/utils/settings';

function parsePeriod(period: string): PremiumPeriod {
  switch (period.toUpperCase()) {
    case 'MONTHLY':
      return PremiumPeriod.MONTHLY;
    case 'YEARLY':
      return PremiumPeriod.YEARLY;
    default:
      throw new Error(`Invalid subscription period: ${period}`);
  }
}

export const subscribePremium = async (req: Request, res: Response) => {
  try {
    const {
      period: periodRaw,
      userId,
      payerAddress,
      paymentHash,
      txHash,
    } = req.body;

    const period = parsePeriod(periodRaw);
    // Check for active subscription of the same type
    const existing = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'COMPLETED',
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (existing) {
      res.status(409).json({
        error: `You already have an active subscription.`,
      });
      return;
    }

    const scheduled = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'SCHEDULED',
        period,
      },
    });

    if (scheduled) {
      res.status(409).json({
        error: `You already have a pending ${period} subscription scheduled to activate.`,
      });
      return;
    }

    const settingKey =
      period === PremiumPeriod.MONTHLY
        ? 'premiumPriceMonthly'
        : 'premiumPriceYearly';
    const expectedAmount = await getSetting(settingKey);

    const now = new Date();
    const expiresAt =
      period === PremiumPeriod.MONTHLY
        ? new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        : new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

    const userWallet = await findOrCreateUserWallet(payerAddress, userId);

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerWalletId: userWallet.id,
        period,
        expectedAmount: new Decimal(expectedAmount ?? 0),
        blockchainTransactionHash: txHash,
        status: 'COMPLETED',
        startsAt: now,
        expiresAt,
        blockchainPaymentHash: paymentHash,
      },
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const changeToYearlyPremiumSubscription = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId, payerAddress, paymentHash, txHash } = req.body;

    const now = new Date();
    const activeMonthly = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'COMPLETED',
        period: 'MONTHLY',
        expiresAt: { gte: now },
      },
      orderBy: { expiresAt: 'desc' },
    });

    if (!activeMonthly) {
      res.status(400).json({
        error: 'No active monthly subscription found.',
      });
      return;
    }

    const alreadyScheduledYearly = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'SCHEDULED',
        period: 'YEARLY',
      },
    });

    if (alreadyScheduledYearly) {
      res.status(409).json({
        error: 'You already have a scheduled yearly subscription.',
      });
      return;
    }

    const yearlyPrice = await getSetting('premiumPriceYearly');

    const startsAt = activeMonthly.expiresAt;
    const expiresAt = new Date(startsAt.getTime() + 365 * 24 * 60 * 60 * 1000);

    const userWallet = await findOrCreateUserWallet(payerAddress, userId);

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerWalletId: userWallet.id,
        period: 'YEARLY',
        status: 'SCHEDULED', // Marked for activation later
        expectedAmount: new Decimal(yearlyPrice),
        blockchainTransactionHash: txHash,
        startsAt,
        expiresAt,
        blockchainPaymentHash: paymentHash,
      },
    });

    res.status(200).json({
      ok: true,
      scheduledStart: startsAt,
    });
    return;
  } catch (err) {
    console.error({ err });
    res.status(500).json({ error: err.message });
    return;
  }
};

export const changeToMonthlyPremiumSubscription = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId, payerAddress, paymentHash, txHash } = req.body;

    const now = new Date();

    const activeYearly = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'COMPLETED',
        period: 'YEARLY',
        expiresAt: { gte: now },
      },
      orderBy: { expiresAt: 'desc' },
    });

    if (!activeYearly) {
      res.status(400).json({
        error: 'No active yearly subscription found.',
      });
      return;
    }

    const alreadyScheduledMonthly = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'SCHEDULED',
        period: 'MONTHLY',
      },
    });

    if (alreadyScheduledMonthly) {
      res.status(409).json({
        error: 'You already have a scheduled monthly subscription.',
      });
      return;
    }

    const monthlyPrice = await getSetting('premiumPriceMonthly');

    const startsAt = activeYearly.expiresAt;
    const expiresAt = new Date(startsAt.getTime() + 30 * 24 * 60 * 60 * 1000);

    const userWallet = await findOrCreateUserWallet(payerAddress, userId);

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerWalletId: userWallet.id,
        period: 'MONTHLY',
        status: 'SCHEDULED', // Will be activated later
        expectedAmount: new Decimal(monthlyPrice),
        blockchainTransactionHash: txHash,
        startsAt,
        expiresAt,
        blockchainPaymentHash: paymentHash,
      },
    });

    res.status(200).json({
      ok: true,
      scheduledStart: startsAt,
    });
    return;
  } catch (err) {
    console.error({ err });
    res.status(500).json({ error: err.message });
    return;
  }
};
