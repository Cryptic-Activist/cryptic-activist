import { Request, Response } from 'express';
import {
  convertWhere,
  generateRandomNames,
  sanitize,
  slugifyStringLowerCase,
} from 'cryptic-utils';
import { getTrades, getUser, getUsers, getUsersByMultiple } from 'base-ca';

import { assignSafeUserData } from '@/utils/responses/users';
import { mapUsers } from '@/utils/map/users';

const validateCredentials = async (username: string) => {
  const user = await getUser({ username }, {});

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
    const users = await getUsers({ blocked: true });

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

    // @ts-ignore
    const user = await getUser({ ...where }, cleanReqQuery.associations);

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

    const users = await getUsers(
      { offers: true, userLanguage: true },
      { username: user as string },
    );

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

export async function getMultipleUsersController(req: Request, res: Response) {
  try {
    const { query } = req;
    const { user } = query;

    const users = await getUsersByMultiple(
      { offers: true, userLanguage: true },
      {
        OR: [
          {
            username: {
              contains: user as string,
              mode: 'insensitive',
            },
          },
          {
            firstName: {
              contains: user as string,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: user as string,
              mode: 'insensitive',
            },
          },
        ],
      },
    );

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

    const user = await getUser(cleanQuery, {});

    if (!user) {
      res.status(400).send({
        errors: ['User not found'],
      });
    }

    res.status(200).send({
      names: { first_name: user?.firstName, last_name: user?.lastName },
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

    const user = await getUser({ id: userId }, { userLanguage: true });

    if (!user) {
      res.status(404).send({
        errors: ['User not found'],
      });
    }

    // @ts-ignore
    const safeUser = await assignSafeUserData(user);

    res.status(200).send({
      ...safeUser,
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

    const user = await getUser(
      { username },
      { userLanguage: true, blocked: true, blockers: true, trusted: true },
    );

    if (!user) {
      res.status(404).send({
        errors: ['User not found'],
      });
    }

    const trades = await getTrades(
      {
        chat: false,
        cryptocurrency: false,
        fiat: false,
        offer: false,
        trader: false,
        vendor: false,
      },
      { vendorId: user?.id },
    );

    // @ts-ignore
    const safeUser = await assignSafeUserData(user);

    res.status(200).send({ ...safeUser, tradesCount: trades.length });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
