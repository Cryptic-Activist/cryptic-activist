import { JWT_REFRESH_SECRET, JWT_SECRET } from '@/constants/env';
import jwt, { Secret } from 'jsonwebtoken';

import { GenerateTokenParam } from './types';

export const generateToken = ({
  objectToTokenize,
  expiresIn,
}: GenerateTokenParam) => {
  return jwt.sign(objectToTokenize, JWT_SECRET as Secret, {
    expiresIn: expiresIn || '1d',
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET);
};

export const decodeToken = (token: string) => {
  let userObj: any;
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return {};

    userObj = user;
  });

  return userObj;
};
