import { z } from 'zod';

export const CountTrusts = z.object({
  userId: z.string(),
});
