import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_TOKEN_SECRET);
}

export function decodeToken(token: string): any {
  let userObj: any;
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return {};

    userObj = user;
  });

  return userObj;
}
