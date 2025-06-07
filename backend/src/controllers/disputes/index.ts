import { DisputeSeverity, DisputeStatus, DisputeType } from '@prisma/client';
import { Request, Response } from 'express';

import { prisma } from '@/services/db';

export const getDisputesAdmin = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { status, severity, type, amount, moderatorId } = req.query;

    // Construct Prisma `where` clause
    const where: any = {};

    // Status filter
    if (status) {
      where.status = status;
    }

    // Severity filter
    if (severity) {
      where.severity = severity;
    }

    // Type filter
    if (type) {
      where.type = type;
    }

    // Moderator filter
    if (moderatorId) {
      where.moderatorId = moderatorId;
    }

    // Amount filter (fiat or crypto amount via trade relation)
    if (amount) {
      const parsedAmount = parseFloat(amount as string);
      if (!isNaN(parsedAmount)) {
        where.trade = { fiatAmount: parsedAmount };
      }
    }

    // Fetch paginated disputes with related data
    const [disputes, totalCount] = await Promise.all([
      prisma.tradeDispute.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          type: true,
          severity: true,
          priority: true,
          status: true,
          createdAt: true,
          resolvedAt: true,
          slaDueAt: true,
          resolutionNote: true,
          raisedBy: {
            select: {
              id: true,
              username: true,
            },
          },
          moderator: {
            select: {
              id: true,
              username: true,
            },
          },
          trade: {
            select: {
              id: true,
              fiatAmount: true,
              cryptocurrencyAmount: true,
              status: true,
              vendor: {
                select: {
                  id: true,
                  username: true,
                },
              },
              trader: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          winner: {
            select: {
              username: true,
            },
          },
          loser: {
            select: {
              username: true,
            },
          },
        },
      }),
      prisma.tradeDispute.count({ where }),
    ]);

    res.status(200).json({
      data: disputes,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getDisputesAdminFilters = async (req: Request, res: Response) => {
  try {
    const { filter } = req.params;

    const filters = {
      status: DisputeStatus,
      severity: DisputeSeverity,
      type: DisputeType,
    };

    if (filter === 'moderator') {
      const mods = await prisma.admin.findMany({
        select: {
          id: true,
          username: true,
        },
      });

      res.status(200).json(mods);
      return;
    }

    res.status(200).json(Object.values(filters[filter]));
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
