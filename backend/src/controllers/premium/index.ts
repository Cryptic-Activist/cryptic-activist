import { Request, Response } from 'express';
import {
  getPremiumContract,
  getProvider,
} from '@/services/blockchains/premium';

import { ETHEREUM_PREMIUM_CONTRACT_ADDRESS } from '@/constants/env';
import { PremiumPeriod } from '@prisma/client';
import { getSetting } from '@/utils/settings';
import { prisma } from '@/services/db';

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
    const { period: periodRaw, userId, payerAddress } = req.body;

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
      return res.status(409).json({
        error: `You already have an active subscription.`,
      });
    }

    const scheduled = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'SCHEDULED',
        period,
      },
    });

    if (scheduled) {
      return res.status(409).json({
        error: `You already have a pending ${period} subscription scheduled to activate.`,
      });
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

    const blockchainTransactionHash =
      '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'; // Replace with actual hash

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerAddress,
        period,
        expectedAmount,
        blockchainTransactionHash,
        status: 'COMPLETED',
        startsAt: now,
        expiresAt,
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
    const { userId, payerAddress } = req.body;

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
      return res.status(400).json({
        error: 'No active monthly subscription found.',
      });
    }

    const alreadyScheduledYearly = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'SCHEDULED',
        period: 'YEARLY',
      },
    });

    if (alreadyScheduledYearly) {
      return res.status(409).json({
        error: 'You already have a scheduled yearly subscription.',
      });
    }

    const yearlyPrice = await getSetting('premiumPriceYearly');

    const startsAt = activeMonthly.expiresAt;
    const expiresAt = new Date(startsAt.getTime() + 365 * 24 * 60 * 60 * 1000);

    const blockchainTransactionHash = '0xSCHEDULED_YEARLY_HASH'; // Replace with real hash

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerAddress,
        period: 'YEARLY',
        status: 'SCHEDULED', // Marked for activation later
        expectedAmount: yearlyPrice,
        blockchainTransactionHash,
        startsAt,
        expiresAt,
      },
    });

    return res.status(200).json({
      ok: true,
      scheduledStart: startsAt,
    });
  } catch (err) {
    console.error({ err });
    return res.status(500).json({ error: err.message });
  }
};

export const changeToMonthlyPremiumSubscription = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId, payerAddress } = req.body;

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
      return res.status(400).json({
        error: 'No active yearly subscription found.',
      });
    }

    const alreadyScheduledMonthly = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        status: 'SCHEDULED',
        period: 'MONTHLY',
      },
    });

    if (alreadyScheduledMonthly) {
      return res.status(409).json({
        error: 'You already have a scheduled monthly subscription.',
      });
    }

    const monthlyPrice = await getSetting('premiumPriceMonthly');

    const startsAt = activeYearly.expiresAt;
    const expiresAt = new Date(startsAt.getTime() + 30 * 24 * 60 * 60 * 1000);

    const blockchainTransactionHash = '0xSCHEDULED_MONTHLY_HASH'; // Replace with real hash

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerAddress,
        period: 'MONTHLY',
        status: 'SCHEDULED', // Will be activated later
        expectedAmount: monthlyPrice,
        blockchainTransactionHash,
        startsAt,
        expiresAt,
      },
    });

    return res.status(200).json({
      ok: true,
      scheduledStart: startsAt,
    });
  } catch (err) {
    console.error({ err });
    return res.status(500).json({ error: err.message });
  }
};
