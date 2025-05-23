import {
  ZodConfirmPassword,
  ZodEmail,
  ZodFirstName,
  ZodLastName,
  ZodPassword,
  ZodReferralCode,
  ZodUsername,
} from '@/layouts/modals/zod';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const RegisterCredrentials = z
  .object({
    names: z.object({
      firstName: ZodFirstName,
      lastName: ZodLastName,
    }),
    username: ZodUsername,
    email: ZodEmail,
    referralCode: ZodReferralCode,
    password: ZodPassword,
    confirmPassword: ZodConfirmPassword,
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

export const registerResolver = zodResolver(RegisterCredrentials);
