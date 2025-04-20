import { GenerateToken } from './types';
import { createToken } from 'base-ca';
import { generateAccessToken } from '../jwt';
import { getExpiresAt } from '@/utils/date';

export const generateToken: GenerateToken = async (userId, expiresIn) => {
  const token = generateAccessToken(userId, expiresIn);
  const expiresAt = getExpiresAt(expiresIn);
  const newToken = await createToken({
    where: { id: '' },
    update: {},
    create: {
      token,
      expiresAt,
      isUsed: false,
    },
  });

  return newToken;
};
