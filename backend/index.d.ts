import { Role } from '@/middlewares/authorization/types';

declare module '*.json';

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        roles: {
          role: Role;
        }[];
      };
      user?: {
        id: string;
      };
    }
  }
}
