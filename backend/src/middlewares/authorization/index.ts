import { NextFunction, Request, Response } from 'express';

import { Authorization } from './zod';
import { Role } from './types';
import { decodeToken } from '@/utils/generators/jwt';
import { prisma } from '@/services/db';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = Authorization.safeParse(req.headers);

    if (validated.error) {
      res.status(401).send({
        errors: validated.error,
      });
      return;
    }

    const token = validated.data.authorization.split('Bearer ')[1];
    const decoded = decodeToken(token);

    if (!decoded) {
      res.status(401).send({
        errors: ['Invalid token'],
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { id: decoded.userId },
      select: { id: true, isVerified: true },
    });

    if (!user) {
      res.status(401).send({
        errors: ['Invalid token or user was not found.'],
      });
      return;
    }

    if (!user.isVerified) {
      res.status(401).send({
        errors: ['User not verified.'],
      });
      return;
    }

    next();
  } catch (errors) {
    console.log(errors);
    res.status(500).send({
      errors,
    });
    return;
  }
};

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = Authorization.safeParse(req.headers);

    if (validated.error) {
      res.status(401).send({
        errors: validated.error,
      });
      return;
    }

    const token = validated.data.authorization.split('Bearer ')[1];
    const decoded = decodeToken(token);

    if (!decoded) {
      res.status(401).send({
        errors: ['Invalid token'],
      });
      return;
    }

    const admin = await prisma.admin.findFirst({
      where: { id: decoded.userId },
      select: {
        id: true,
        isVerified: true,
        roles: {
          select: {
            adminRoles: true,
          },
        },
      },
    });

    if (!admin) {
      res.status(401).send({
        errors: ['Invalid token or user was not found.'],
      });
      return;
    }

    if (!admin.isVerified) {
      res.status(401).send({ error: ['Forbidden'] });
      return;
    }

    req.admin = {
      id: admin.id,
      roles: admin.roles.map((r) => ({
        role: r.adminRoles.role as Role,
      })),
    };

    next();
  } catch (errors) {
    console.log(errors);
    res.status(500).send({
      errors,
    });
    return;
  }
};

export const requireAdminRole = (requiredRole: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = req.admin;

      if (!admin || !admin.roles || !Array.isArray(admin.roles)) {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }

      const allowedRole = admin.roles.filter((role) =>
        requiredRole.includes(role.role),
      );

      if (allowedRole.length === 0) {
        res.status(401).send({ error: 'Forbidden' });
        return;
      }

      next();
    } catch (errors) {
      console.log(errors);
      res.status(500).send({
        errors,
      });
      return;
    }
  };
};
