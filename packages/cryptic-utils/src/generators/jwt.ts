import jwt, { JwtPayload } from 'jsonwebtoken';
import { objToTokenizeType } from '../types';

export const generateToken = (
  objToTokenize: objToTokenizeType,
  secret: string,
  expiresIn: string,
) => jwt.sign({ ...objToTokenize }, secret, { expiresIn });

export const generateRefreshToken = (
  objToTokenize: objToTokenizeType,
  secret: string,
) => jwt.sign({ ...objToTokenize }, secret);

export const decodeToken = (token: string, secret: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload;
