import { z } from 'zod';

export const RequestEmailChangeParams = z.object({
  userId: z.string().min(2),
});

export const RequestEmailChangeBody = z.object({
  email: z.string().email(),
});

export const RequestEmailChangeVerifyParams = z.object({
  token: z.string().min(2),
});
