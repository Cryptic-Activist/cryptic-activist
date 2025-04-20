import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const ResetPasswordRequest = z.object({
  unique: z
    .string({ message: 'Field is required' })
    .min(5, 'Must be at least 5 characters long'),
});

export const resetPasswordRequestResolver = zodResolver(ResetPasswordRequest);

export const ResetPassword = z
  .object({
    password: z
      .string({ message: 'Field is required' })
      .min(5, 'Must be at least 5 characters long'),
    passwordConfirm: z
      .string({ message: 'Field is required' })
      .min(5, 'Must be at least 5 characters long'),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
      });
    }
  });

export const resetPasswordResolver = zodResolver(ResetPassword);
