import { z } from 'zod';

export const CountBlocks = z.object({
  userId: z.string(),
});
