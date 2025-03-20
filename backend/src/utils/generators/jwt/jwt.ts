import { JWT_REFRESH_SECRET, JWT_SECRET } from '@/constants/env';

import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1d',
  });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET);
}

export function decodeToken(token: string): any {
  let userObj: any;
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return {};

    userObj = user;
  });

  return userObj;
}
