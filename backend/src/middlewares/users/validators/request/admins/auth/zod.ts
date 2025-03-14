import { z } from 'zod';

export const Login = z.object({
  password: z.string().min(6).max(20),
  username: z.string().min(5),
});

export const Register = z.object({
  names: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
  }),
  username: z.string().min(5),
  password: z.string(),
  password2: z.string(),
});

export const PasswordReset = z.string();

export const PrivateKeys = z.object({
  privateKeys: z.string().array().length(12),
});
