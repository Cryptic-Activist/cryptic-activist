import { Request, Response } from 'express';
import { generateRandomNames, slugifyStringLowerCase } from '@/utils/string';

import { calculatePercentageChange } from '@/utils/number';
import { convertWhere } from '@/utils/object';
import { getMonthBoundaries } from '@/utils/date';
import { mapUsers } from '@/utils/map/users';
import { prisma } from '@/services/db';
import { sanitize } from '@/utils/sanitizer';

const validateCredentials = async (username: string) => {
  const user = await prisma.user.findFirst({ where: { username } });

  if (!user) {
    return true;
  }

  return false;
};

export async function getRandomCredentials(_req: Request, res: Response) {
  try {
    let names: string[];
    let username: string;

    do {
      names = generateRandomNames();
      username = slugifyStringLowerCase(`${names[0]} ${names[1]}`);
    } while (!(await validateCredentials(username)));

    res.status(200).send({
      names,
      username,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
}

export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        blocked: true,
      },
    });

    const mapped = mapUsers(users);

    res.status(200).send({
      ...mapped,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getUserController(req: Request, res: Response) {
  try {
    // const { associations } = req.query;
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const user = await prisma.user.findFirst({ ...where });

    if (!user) {
      res.status(400).send({
        errors: ['User not found'],
      });
    }

    res.status(200).send({
      ...user,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getUsersController(req: Request, res: Response) {
  try {
    const { query } = req;
    const { user } = query;

    const users = await prisma.user.findMany({
      where: { username: user as string },
      select: {
        offers: true,
        userLanguage: true,
      },
    });

    if (!users) {
      res.status(400).send({
        errors: ['Users not found'],
      });
    }

    res.status(200).send({
      ...users,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getUserVerify(req: Request, res: Response) {
  try {
    const { id, username } = req.query;

    const queryObj: { id?: string; username?: string } = {};

    if (id) {
      queryObj.id = id.toString();
    }

    if (username) {
      queryObj.username = username.toString();
    }

    const cleanQuery = sanitize(queryObj, []);

    const user = await prisma.user.findFirst({ where: cleanQuery });

    if (!user) {
      res.status(400).send({
        errors: ['User not found'],
      });
    }

    res.status(200).send({
      names: { firstName: user?.firstName, lastName: user?.lastName },
      username: user?.username,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { userId } = params;

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { userLanguage: true },
    });

    if (!user) {
      res.status(404).send({
        errors: ['User not found'],
      });
    }

    res.status(200).send({
      ...user,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { username } = params;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        userLanguage: true,
        blocked: true,
        blockers: true,
        trusted: true,
      },
    });

    if (!user) {
      res.status(404).send({
        errors: ['User not found'],
      });
    }

    const trades = await prisma.trade.findMany({
      where: { vendorId: user!.id },
    });

    res.status(200).send({ ...user, tradesCount: trades.length });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export async function getTotalUsers(_req: Request, res: Response) {
  try {
    const totalUsers = await prisma.user.count();

    const { startOfLastMonth, startOfThisMonth } = getMonthBoundaries();

    // Get counts
    const [thisMonthCount, lastMonthCount] = await Promise.all([
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfThisMonth,
          },
        },
      }),
      prisma.user.count({
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

    res.status(200).json({ total: totalUsers, percentageChange });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const getBestVendors = async (req: Request, res: Response) => {
  try {
    const bestVendors = await prisma.user.findMany({
      where: {
        isSuspended: false,
      },
      orderBy: [
        {
          tradeVendor: {
            _count: 'desc',
          },
        },
        {
          feedbackTrader: {
            _count: 'desc',
          },
        },
        {
          trustScore: 'desc',
        },
        {
          lastLoginAt: 'desc',
        },
        {
          createdAt: 'asc',
        },
      ],
      select: {
        _count: {
          select: {
            tradeVendor: {
              where: {
                status: 'COMPLETED',
              },
            },
            feedbackTrader: {
              where: {
                type: 'POSITIVE',
              },
            },
          },
        },
        id: true,
        username: true,
        profileColor: true,
        firstName: true,
        lastName: true,
        tradeVendor: {
          where: {
            status: 'COMPLETED',
          },
          select: {
            id: true,
          },
        },
        feedbackTrader: {
          where: {
            type: 'POSITIVE',
          },
          select: {
            id: true,
          },
        },
        disputeLoser: true,
      },
      take: 3, // Limit to the top 20 vendors
    });

    const vendorsWithDisputeRate = bestVendors.map((vendor) => {
      const totalTrades = vendor.tradeVendor.length;
      const disputesLost = vendor.disputeLoser.length;
      const disputeRate = totalTrades > 0 ? disputesLost / totalTrades : 0;
      return {
        ...vendor,
        disputeRate,
      };
    });

    vendorsWithDisputeRate.sort((a, b) => a.disputeRate - b.disputeRate);

    res.status(200).json(vendorsWithDisputeRate);
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the best vendors.' });
  }
};
