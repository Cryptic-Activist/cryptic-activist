import { JWT_REFRESH_SECRET, JWT_SECRET } from '@/constants/env';
import jwt, { Secret } from 'jsonwebtoken';

import { GenerateTokenParam } from './types';
import { prisma } from '@/services/db';

export const generateToken = ({
  objectToTokenize,
  expiresIn = '15m',
}: GenerateTokenParam) => {
  return jwt.sign(objectToTokenize, JWT_SECRET as Secret, {
    expiresIn,
  });
};

export const generateRefreshToken = async (
  id: string,
  type: 'user' | 'admin',
) => {
  const refreshToken = jwt.sign({ userId: id }, JWT_REFRESH_SECRET as Secret, {
    expiresIn: '7d',
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      expiresAt,
      ...(type === 'user' ? { userId: id } : { adminId: id }),
    },
  });

  return refreshToken;
};

export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    return null;
  }
};

export const decodeRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as any;
  } catch (error) {
    return null;
  }
};
