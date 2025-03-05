import { z } from 'zod';

export const Authorization = z.string();

export const AuthorizationArray = z.string().array().length(2);
