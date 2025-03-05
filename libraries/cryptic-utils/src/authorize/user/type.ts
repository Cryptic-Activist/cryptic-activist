import { JwtPayload } from 'jsonwebtoken';
import type { ZodError } from 'zod';

export type AuthorizeUser = Promise<{
  errors?: string[] | ZodError<string> | ZodError<string[]> | undefined;
  success?: boolean;
  decoded?: JwtPayload;
  user?: any;
}>;
