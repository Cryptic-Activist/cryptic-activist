import { Request, Response } from 'express';
import { calculatePercentageChange, formatNumberCompact } from '@/utils/number';

import { getMonthBoundaries } from '@/utils/date';
import { prisma } from '@/services/db';

export async function getTradesByUserAsVendor(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const [trades, totalCount] = await Promise.all([
      prisma.trade.findMany({
        where: {
          vendor: {
            id: userId,
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          startedAt: 'desc',
        },
        select: {
          id: true,
          cryptocurrency: true,
          cryptocurrencyAmount: true,
          fiat: true,
          fiatAmount: true,
          endedAt: true,
          escrowReleasedAt: true,
          status: true,
          blockchainTransactionHash: true,
          exchangeRate: true,
          startedAt: true,
          expiredAt: true,
          offer: {
            select: {
              timeLimit: true,
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
              firstName: true,
              lastName: true,
              username: true,
              profileColor: true,
            },
          },
          vendor: {
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
              firstName: true,
              lastName: true,
              username: true,
              profileColor: true,
            },
          },
        },
      }),
      prisma.trade.count({
        where: {
          vendor: {
            id: userId,
          },
        },
      }),
    ]);

    res.status(200).send({
      data: trades,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTradesByUserAsTrader(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const [trades, totalCount] = await Promise.all([
      prisma.trade.findMany({
        where: {
          trader: {
            id: userId,
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          startedAt: 'desc',
        },
        select: {
          id: true,
          cryptocurrency: true,
          cryptocurrencyAmount: true,
          fiat: true,
          fiatAmount: true,
          endedAt: true,
          escrowReleasedAt: true,
          status: true,
          blockchainTransactionHash: true,
          exchangeRate: true,
          startedAt: true,
          expiredAt: true,
          offer: {
            select: {
              timeLimit: true,
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
              firstName: true,
              lastName: true,
              username: true,
              profileColor: true,
            },
          },
          vendor: {
            select: {
              _count: {
                select: {
                  tradeVendor: {
                    where: {
                      status: 'COMPLETED',
                    },
                  },
                },
              },
              firstName: true,
              lastName: true,
              username: true,
              profileColor: true,
            },
          },
        },
      }),
      prisma.trade.count({
        where: {
          trader: {
            id: userId,
          },
        },
      }),
    ]);

    res.status(200).send({
      data: trades,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getRecentTrades(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const [trades, totalCount] = await Promise.all([
      prisma.trade.findMany({
        orderBy: {
          startedAt: 'desc',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
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
          startedAt: true,
          status: true,
          vendor: {
            select: {
              username: true,
            },
          },
          trader: {
            select: {
              username: true,
            },
          },
        },
      }),
      prisma.trade.count(),
    ]);

    res.status(200).json({
      data: trades,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTradesAdmin(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const [trades, totalCount] = await Promise.all([
      prisma.trade.findMany({
        orderBy: {
          startedAt: 'desc',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          fiatAmount: true,
          fiat: {
            select: {
              symbol: true,
            },
          },
          cryptocurrencyAmount: true,
          cryptocurrency: {
            select: {
              symbol: true,
            },
          },
          startedAt: true,
          status: true,
          paymentMethod: {
            select: {
              name: true,
            },
          },
          tradeDispute: {
            select: {
              priority: true,
            },
          },
          vendor: {
            select: {
              username: true,
            },
          },
          trader: {
            select: {
              username: true,
            },
          },
        },
      }),
      prisma.trade.count(),
    ]);

    res.status(200).json({
      data: trades,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTotalTrades(_req: Request, res: Response) {
  try {
    const totalTrades = await prisma.trade.count();

    const { startOfLastMonth, startOfThisMonth } = getMonthBoundaries();

    // Get counts
    const [thisMonthCount, lastMonthCount] = await Promise.all([
      prisma.trade.count({
        where: {
          createdAt: {
            gte: startOfThisMonth,
          },
        },
      }),
      prisma.trade.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfThisMonth,
          },
        },
      }),
    ]);

    const percentageChange = calculatePercentageChange(
      thisMonthCount,
      lastMonthCount,
    );

    res.status(200).json({ total: totalTrades, percentageChange });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTotalCompletedTrades(_req: Request, res: Response) {
  try {
    const totalTrades = await prisma.trade.count({
      where: {
        status: 'COMPLETED',
      },
    });

    const { startOfLastMonth, startOfThisMonth } = getMonthBoundaries();

    // Get counts
    const [thisMonthCount, lastMonthCount] = await Promise.all([
      prisma.trade.count({
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: startOfThisMonth,
          },
        },
      }),
      prisma.trade.count({
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfThisMonth,
          },
        },
      }),
    ]);

    const percentageChange = calculatePercentageChange(
      thisMonthCount,
      lastMonthCount,
    );

    res.status(200).json({ total: totalTrades, percentageChange });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTotalTradeVolume(_req: Request, res: Response) {
  try {
    const { startOfLastMonth, startOfThisMonth } = getMonthBoundaries();

    // This month
    const currentVolume = await prisma.trade.aggregate({
      _sum: {
        fiatAmount: true,
      },
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: startOfThisMonth,
        },
      },
    });

    // Last month
    const lastVolume = await prisma.trade.aggregate({
      _sum: {
        fiatAmount: true,
      },
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfThisMonth,
        },
      },
    });

    const current = currentVolume._sum.fiatAmount ?? 0;
    const last = lastVolume._sum.fiatAmount ?? 0;

    const percentageChange = calculatePercentageChange(current, last);

    res.status(200).json({
      total: `$${formatNumberCompact(current)}`,
      percentageChange,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
