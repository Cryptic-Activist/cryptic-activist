import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginCredrentials = z.object({
  username: z.string().min(8),
  password: z.string().min(8),
});

export const loginResolver = zodResolver(LoginCredrentials);

const regexOnlyNumbers = /^\d+$/;

export const Login2FA = z
  .object({
    token2FA: z.string().min(6).max(6),
  })
  .superRefine(({ token2FA }, ctx) => {
    if (!regexOnlyNumbers.test(token2FA)) {
      ctx.addIssue({
        code: 'custom',
        path: ['token2FA'],
        message: 'Only numbers are allowed',
      });
    }
  });

export const login2FAResolver = zodResolver(Login2FA);
