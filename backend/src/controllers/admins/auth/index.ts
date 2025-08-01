import { Request, Response } from 'express';
import {
  decodeToken,
  generateRefreshToken,
  generateToken,
} from '@/utils/generators/jwt';

import { EMAIL_FROM } from '@/services/email';
import { FRONTEND_ADMIN } from '@/constants/env';
import bcrypt from 'bcryptjs';
import { buildAdminInvitation } from '@/services/email/templates/invite-admin';
import e from 'cors';
import { generateRandomHash } from '@/utils/string';
import { getExpiresAt } from '@/utils/date';
import { prisma } from '@/services/db/prisma';
import { publishToQueue } from '@/services/rabbitmq';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const admin = await prisma.admin.findFirst({
      where: {
        username,
      },
    });

    if (!admin) {
      res.status(400).send({
        error: ['Unable to login'],
      });
      return;
    }

    if (!admin.password) {
      res.status(400).send({
        errors: ['Invalid credentials'],
      });
      return;
    }

    bcrypt.compare(password, admin.password, async (compareError, isMatch) => {
      if (compareError) {
        res.status(500).send({
          errors: [compareError.message],
        });
        return;
      }

      if (!isMatch) {
        res.status(400).send({
          errors: ['Invalid credentials'],
        });
        return;
      }

      if (!admin.isVerified) {
        res.status(401).send({
          errors: ['Account is not verified'],
        });
        return;
      }

      const accessToken: string = generateToken({
        objectToTokenize: { userId: admin!.id },
      });

      const refreshToken: string = await generateRefreshToken(
        admin!.id,
        'admin',
      );

      res.status(200).send({
        accessToken,
        refreshToken,
      });
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export async function loginDecodeToken(req: Request, res: Response) {
  const { accessToken } = req.params;

  try {
    const decoded = decodeToken(accessToken);

    if (!decoded) {
      res.status(401).send({
        error: ['Unable to decode token'],
      });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        roles: {
          select: {
            adminRoles: true,
          },
        },
      },
    });

    if (!admin) {
      res.status(404).send({
        errors: ['User not found'],
      });
      return;
    }

    res.status(200).send({
      ...admin,
      roles: admin.roles.map((r) => ({
        id: r.adminRoles.id,
        role: r.adminRoles.role,
      })),
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ errors: ['Refresh token is required'] });
      return;
    }

    const decoded = decodeToken(refreshToken);

    if (!decoded) {
      res.status(403).json({ errors: ['Invalid refresh token'] });
      return;
    }

    const existingToken = await prisma.refreshToken.findFirst({
      where: {
        token: refreshToken,
        isUsed: false,
      },
    });

    if (!existingToken) {
      res
        .status(403)
        .json({ errors: ['Refresh token not found or already used'] });
      return;
    }

    await prisma.refreshToken.update({
      where: {
        id: existingToken.id,
      },
      data: {
        isUsed: true,
      },
    });

    const accessToken = generateToken({
      objectToTokenize: { userId: decoded.userId },
    });

    const newRefreshToken = await generateRefreshToken(decoded.userId, 'admin');

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(500).json({
      errors: error,
    });
  }
};

export const inviteAdmin = async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, roles: rolesArray } = req.body;

  try {
    const transactions = await prisma.$transaction(async (tx) => {
      const existingEmail = await tx.admin.findFirst({
        where: {
          email,
        },
      });
      if (existingEmail) {
        res.status(400).send({
          errors: ['Email already exists'],
        });
        return;
      }

      let newUsername = username;

      const existingUsername = await tx.admin.findFirst({
        where: {
          username,
        },
      });

      if (existingUsername) {
        const hashUsername = generateRandomHash(6);
        newUsername = `${username}-${hashUsername}`;
      }

      const roles = await tx.adminRoles.findMany({
        where: {
          role: {
            in: rolesArray,
          },
        },
        select: {
          id: true,
          role: true,
        },
      });

      const admin = await tx.admin.create({
        data: {
          firstName,
          lastName,
          username: newUsername,
          email,
          roles: {
            create: roles.map((role) => ({
              adminRoles: {
                connect: {
                  id: role.id,
                },
              },
            })),
          },
        },
      });

      const expires = '30d';
      const token = generateToken({
        objectToTokenize: { userId: admin.id },
        expiresIn: expires,
      });
      const expiresAt = getExpiresAt(expires);
      const newToken = await tx.token.create({
        data: {
          token,
          expiresAt,
          isUsed: false,
        },
      });

      if (!newToken) {
        res.status(500).send({
          errors: ['Unable to create verification token'],
        });
        return;
      }

      const verifyAccountEmailBody = buildAdminInvitation(admin, token);
      const publishedVerifyAccount = await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: admin.email,
            name: `${admin.firstName} ${admin.lastName}`,
          },
        ],
        subject: 'Verify your account - Cryptic Activist Admin',
        html: verifyAccountEmailBody,
        text: 'Verify your account',
      });

      await Promise.all([publishedVerifyAccount]);

      return { ok: true };
    });

    res.status(201).send({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [err.message],
    });
    return;
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  const { roles } = req.body;
  const { id } = req.params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const admin = await tx.admin.findUnique({
        where: {
          id,
        },
        include: {
          roles: {
            select: {
              adminRolesId: true,
            },
          },
        },
      });

      if (!admin) {
        throw new Error('Unable to find admin to update');
      }

      const existingRoleIds = admin.roles.map((role) => role.adminRolesId);

      const rolesToUpdate = await tx.adminRoles.findMany({
        where: {
          role: {
            in: roles,
          },
        },
        select: {
          id: true,
        },
      });

      const newRoleIds = rolesToUpdate.map((role) => role.id);

      const rolesToAdd = newRoleIds.filter(
        (roleId) => !existingRoleIds.includes(roleId),
      );
      const rolesToRemove = existingRoleIds.filter(
        (roleId) => !newRoleIds.includes(roleId),
      );

      const superAdminRole = await tx.adminRoles.findFirst({
        where: {
          role: 'SENIOR_ADMIN',
        },
        select: {
          id: true,
        },
      });

      let finalRolesToRemove = rolesToRemove;
      if (superAdminRole && existingRoleIds.includes(superAdminRole.id)) {
        finalRolesToRemove = rolesToRemove.filter(
          (roleId) => roleId !== superAdminRole.id,
        );
      }

      if (finalRolesToRemove.length > 0) {
        await tx.adminAdminRole.deleteMany({
          where: {
            adminId: id,
            adminRolesId: {
              in: finalRolesToRemove,
            },
          },
        });
      }

      if (rolesToAdd.length > 0) {
        await tx.adminAdminRole.createMany({
          data: rolesToAdd.map((roleId) => ({
            adminId: id,
            adminRolesId: roleId,
          })),
        });
      }

      return { ok: true };
    });

    if (!result.ok) {
      res.status(400).send({
        ok: true,
      });
    }

    res.status(201).send({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const toggleAdminActivation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const admin = await tx.admin.findUnique({
        where: {
          id,
        },
        select: { isActive: true },
      });

      if (!admin) {
        throw new Error('Unable to find admin to update');
      }

      await tx.admin.update({
        where: {
          id,
        },
        data: {
          isActive: !admin.isActive,
        },
        select: {
          isActive: true,
        },
      });

      return { ok: true };
    });

    if (!result.ok) {
      res.status(400).send({
        ok: true,
      });
    }

    res.status(201).send({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const softDeleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const admin = await tx.admin.findUnique({
        where: {
          id,
        },
      });

      if (!admin) {
        throw new Error('Unable to find admin to update');
      }

      await tx.admin.update({
        where: {
          id,
        },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
        select: {
          isActive: true,
        },
      });

      return { ok: true };
    });

    if (!result.ok) {
      res.status(400).send({
        ok: true,
      });
    }

    res.status(201).send({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const setAdminPasswordVerifyToken = async (
  req: Request,
  res: Response,
) => {
  const { token } = req.params;

  try {
    const decoded = decodeToken(token);
    if (!decoded) {
      res.status(401).send({
        errors: ['Unable to decode the token'],
      });
      return;
    }

    const admin = await prisma.admin.findFirst({
      where: {
        id: decoded.userId as string,
      },
    });

    if (!admin) {
      res.status(404).send({
        errors: ['Admin not found'],
      });
      return;
    }

    const validToken = await prisma.token.findFirst({
      where: {
        token,
        isUsed: false,
      },
    });

    if (!validToken) {
      res.status(404).send({
        errors: ['Token is invalid'],
      });
      return;
    }

    res.status(200).send({
      ok: true,
    });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const setAdminPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = decodeToken(token);
    if (!decoded) {
      res.status(401).send({
        errors: ['Unable to decode the token'],
      });
      return;
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const admin = await tx.admin.findFirst({
        where: {
          id: decoded.userId as string,
        },
      });

      if (!admin) {
        return {
          error: 'User not found',
        };
      }

      const existingToken = await tx.token.findFirst({
        where: {
          token,
          isUsed: false,
        },
        select: {
          id: true,
        },
      });

      if (!existingToken) {
        return {
          error: 'Unable to find token',
        };
      }

      const generatedSalt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, generatedSalt);

      const updatedPassword = await tx.admin.update({
        where: { id: admin.id },
        data: { password: hash, isVerified: true },
      });

      if (!updatedPassword) {
        return {
          error: 'Unable to reset password',
        };
      }

      const invalidatedToken = await tx.token.update({
        where: {
          id: existingToken?.id,
        },
        data: {
          isUsed: true,
        },
      });

      if (!invalidatedToken) {
        return {
          error: 'Unable to invalidate token',
        };
      }
    });

    if (transaction?.error) {
      res.status(400).json({ error: transaction.error });
      return;
    }

    res.status(200).send({
      ok: true,
    });
    return;
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const validateWithAuthToken = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string;

    const token = authorization.split('Bearer ')[1];
    const decoded = decodeToken(token);

    if (!decoded) {
      res.status(401).send({
        isValid: false,
      });
      return;
    }

    res.status(200).json({ isValid: true });
    return;
  } catch (err) {
    res.status(500).send({
      isValid: false,
    });
    return;
  }
};
