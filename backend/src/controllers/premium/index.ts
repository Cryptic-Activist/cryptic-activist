import { Request, Response } from 'express';
import {
  getPremiumContract,
  getProvider,
} from '@/services/blockchains/premium';

import { ETHEREUM_PREMIUM_CONTRACT_ADDRESS } from '@/constants/env';
import { getSetting } from '@/utils/settings';
import { prisma } from '@/services/db';

export const subscribePremium = async (req: Request, res: Response) => {
  try {
    const { period, userId, payerAddress } = req.body;

    // Check if user already has an active subscription for the same period
    const existing = await prisma.premiumPurchase.findFirst({
      where: {
        userId,
        period,
        status: 'COMPLETED',
        expiresAt: {
          gte: new Date(), // Still valid
        },
      },
    });

    if (existing) {
      return res.status(409).json({
        error: `You already have an active ${period} subscription.`,
      });
    }

    // Get pricing from settings
    const settingKey =
      period === 'monthly' ? 'premiumPriceMonthly' : 'premiumPriceYearly';
    const expectedAmount = await getSetting(settingKey);

    // Calculate expiry date
    const now = new Date();
    const expiresAt =
      period === 'monthly'
        ? new Date(now.setMonth(now.getMonth() + 1))
        : new Date(now.setFullYear(now.getFullYear() + 1));

    const blockchainTransactionHash =
      '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'; // Replace with actual tx hash

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerAddress,
        period,
        expectedAmount,
        blockchainTransactionHash,
        status: 'COMPLETED',
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

    // Get active monthly subscription
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

    // Expire the current subscription (soft expire)
    await prisma.premiumPurchase.update({
      where: { id: activeMonthly.id },
      data: {
        expiresAt: now,
      },
    });

    // Get yearly price from settings
    const yearlyPrice = await getSetting('premiumPriceYearly');

    // Create new yearly subscription
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    const blockchainTransactionHash = '0xCHANGE_TO_YEARLY_HASH'; // Replace with real hash

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerAddress,
        period: 'YEARLY',
        status: 'COMPLETED',
        expectedAmount: yearlyPrice,
        blockchainTransactionHash,
        startsAt: now,
        expiresAt: oneYearLater,
      },
    });

    return res.status(200).json({ ok: true });
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

    // Get active yearly subscription
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

    // Expire the current yearly subscription
    await prisma.premiumPurchase.update({
      where: { id: activeYearly.id },
      data: {
        expiresAt: now,
      },
    });

    // Get monthly price from settings
    const monthlyPrice = await getSetting('premiumPriceMonthly');

    // Create new monthly subscription
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    const blockchainTransactionHash = '0xCHANGE_TO_MONTHLY_HASH'; // Replace with real hash

    await prisma.premiumPurchase.create({
      data: {
        userId,
        payerAddress,
        period: 'MONTHLY',
        status: 'COMPLETED',
        expectedAmount: monthlyPrice,
        blockchainTransactionHash,
        startsAt: now,
        expiresAt: oneMonthLater,
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error({ err });
    return res.status(500).json({ error: err.message });
  }
};
