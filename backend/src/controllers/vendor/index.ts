import { Request, Response } from 'express';

import { prisma } from '@/services/db';

export async function getVendor(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const vendor = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        _count: {
          select: {
            blocked: true,
            blockers: true,
            trusted: true,
            trusters: true,
          },
        },
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        createdAt: true,
        lastLoginAt: true,
        kyc: {
          where: {
            status: 'VERIFIED',
          },
          select: {
            status: true,
          },
        },
        tier: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
        profileColor: true,
        userLanguage: {
          select: {
            language: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!vendor) {
      res.status(404).send({
        errors: ['User not found'],
      });
      return;
    }

    const lastLoginAt = new Date();

    await prisma.user.update({
      where: {
        id: vendor.id,
      },
      data: {
        lastLoginAt,
      },
    });

    const {
      firstName: _firstName,
      lastName: _lastName,
      lastLoginAt: _lastLoginAt,
      // @ts-ignore
      _count,
      ...rest
    } = vendor;

    const userTradesCount = await prisma.trade.count({
      where: { vendorId: vendor.id },
    });
    const userPositiveFeedbacksCount = await prisma.feedback.count({
      where: {
        trade: {
          vendorId: id,
        },
        type: 'POSITIVE',
      },
    });
    const userNeutralFeedbacksCount = await prisma.feedback.count({
      where: {
        trade: {
          vendorId: id,
        },
        type: 'NEUTRAL',
      },
    });
    const userNegativeFeedbacksCount = await prisma.feedback.count({
      where: {
        trade: {
          vendorId: id,
        },
        type: 'NEGATIVE',
      },
    });

    res.status(200).send({
      ...rest,
      names: {
        firstName: vendor.firstName,
        lastName: vendor.lastName,
      },
      lastLoginAt,
      kyc: vendor.kyc,
      _count: {
        ..._count,
        trades: userTradesCount,
        feedbacks: {
          negative: userNegativeFeedbacksCount,
          neutral: userNeutralFeedbacksCount,
          positive: userPositiveFeedbacksCount,
        },
      },
    });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
