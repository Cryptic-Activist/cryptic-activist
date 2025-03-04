import { Request, Response } from 'express';
import {
  convertWhere,
  generateRandomNames,
  sanitize,
  slugifyStringLowerCase,
} from 'cryptic-utils';
import { getAdmin, getAdmins } from 'base-ca';

import { assignSafeAdminData } from '@/utils/responses/users';
import { mapAdmins } from '@/utils/map/admins';

const validateCredentials = async (username: string) => {
  const user = await getAdmin({ username });

  if (!user) {
    return true;
  }

  return false;
};

export const getRandomCredentials = async (_req: Request, res: Response) => {
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
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await getAdmins();

    const mapped = mapAdmins(admins);

    res.status(200).send({
      ...mapped,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getAdminController = (req: Request, res: Response) => {
  try {
    // const { associations } = req.query;
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    if (associations) {
      // @ts-ignore
      const associationsArr = sanitize(associations.split(','), []);
      cleanReqQuery.associations = associationsArr;
    } else {
      cleanReqQuery.associations = [];
    }

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    // @ts-ignore
    const user = await getAdmin({ ...where }, cleanReqQuery.associations);

    if (!user) {
      res.status(400).send({
        errors: ['Admin not found'],
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

export const getAdminVerify = async (req: Request, res: Response) => {
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

    const user = await getAdmin(cleanQuery);

    if (!user) {
      res.status(400).send({
        errors: ['Admin not found'],
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
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { userId } = params;

    const user = await getAdmin({ id: userId });

    if (!user) {
      res.status(404).send({
        errors: ['Admin not found'],
      });
    }

    // @ts-ignore
    const safeAdmin = await assignSafeAdminData(user);

    res.status(200).send({
      ...safeAdmin,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getAdminByAdminname = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { username } = params;

    const user = await getAdmin({ username });

    if (!user) {
      res.status(404).send({
        errors: ['Admin not found'],
      });
    }

    // @ts-ignore
    const safeAdmin = await assignSafeAdminData(user);

    res.status(200).send({
      ...safeAdmin,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
