import { Request, Response } from 'express';

import { DisputeType } from '@prisma/client';
import { prisma } from '@/services/db';

export async function getDisputeTypes(_req: Request, res: Response) {
  try {
    const disputeTypes = Object.keys(DisputeType).map((type) => type);
    res.status(200).json(disputeTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getDisputeAdmin(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const dispute = await prisma.tradeDispute.findUnique({
      where: {
        id,
      },
      select: {
        createdAt: true,
        id: true,
        priority: true,
        severity: true,
        status: true,
        type: true,
        slaDueAt: true,
        raisedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        reason: true,
        resolutionNote: true,
        resolvedAt: true,
        updatedAt: true,
        moderator: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            id: true,
          },
        },
        trade: {
          select: {
            id: true,
            fiatAmount: true,
            fiat: {
              select: {
                symbol: true,
              },
            },
            cryptocurrency: {
              select: {
                symbol: true,
              },
            },
            cryptocurrencyAmount: true,
            vendor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
              },
            },
            trader: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
              },
            },
          },
        },
        loser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        winner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json(dispute);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
