import { Request, Response } from 'express';
import { generateRandomNames, slugifyStringLowerCase } from '@/utils/string';

import { convertWhere } from '@/utils/object';
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
