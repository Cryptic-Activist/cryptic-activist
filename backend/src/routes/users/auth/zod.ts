import { z } from 'zod';

export const Login = z.object({
  password: z.string().min(6).max(20),
  username: z.string().min(5),
});

export const Register = z
  .object({
    names: z.object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
    }),
    username: z.string().min(5),
    email: z.string().email('Invalid email'),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The password must match',
        path: ['confirmPassword'],
      });
    }
  });

export const PasswordReset = z.string();

export const PrivateKeys = z.object({
  username: z.string().min(3),
  privateKeys: z.string().array().length(12),
});
