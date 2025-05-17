import { z } from 'zod';

export const Login = z.object({
  usernameOrEmail: z.string().min(6).max(100),
  password: z.string().min(6).max(20),
});

const regexOnlyNumbers = /^\d+$/;

export const Login2FA = z
  .object({
    userId: z.string().min(6),
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

export const Register = z
  .object({
    names: z.object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
    }),
    username: z.string().min(5),
    referralCode: z.string().optional(),
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

export const AccountVerification = z.object({
  token: z.string().min(1),
});

export const PassswordReset = z
  .object({
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The password must match',
      });
    }
  });
