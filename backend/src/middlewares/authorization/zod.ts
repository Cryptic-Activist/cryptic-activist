import { z } from 'zod';

export const Authorization = z
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
