import { Request, Response } from 'express';
import { generateRandomNames, slugifyStringLowerCase } from '@/utils/string';

import { convertWhere } from '@/utils/object';
import { prisma } from '@/services/db/prisma';
import { sanitize } from '@/utils/sanitizer';

const validateCredentials = async (username: string) => {
  const user = await prisma.admin.findFirst({
    where: {
      username,
    },
  });

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
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        roles: {
          select: {
            adminRoles: true,
          },
        },
        username: true,
      },
    });

    const mappedAdmins = admins.map((admin) => ({
      ...admin,
      roles: admin.roles.map((role) => role.adminRoles.role),
    }));

    res.status(200).send(mappedAdmins);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getAdminController = async (req: Request, res: Response) => {
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

    const user = await prisma.admin.findFirst({
      where,
    });

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

    const user = await prisma.admin.findFirst({
      where: cleanQuery,
    });

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

    const admin = await prisma.admin.findFirst({ where: { id: userId } });

    if (!admin) {
      res.status(404).send({
        errors: ['Admin not found'],
      });
    }

    res.status(200).send({
      ...admin,
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

    const admin = await prisma.admin.findFirst({ where: { username } });

    if (!admin) {
      res.status(404).send({
        errors: ['Admin not found'],
      });
    }

    res.status(200).send({
      ...admin,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
