import { z } from 'zod';

export const AuthenticationUser = z
  .object({
    authorization: z.string(),
  })
  .superRefine(({ authorization }, ctx) => {
    if (!authorization.includes('Bearer ')) {
      ctx.addIssue({
        code: 'custom',
        path: ['authorization'],
        message: 'Invalid authorization code',
      });
    }
  });
