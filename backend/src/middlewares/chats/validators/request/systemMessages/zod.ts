import { z } from 'zod';

export const CreateSystemMessage = z.object({
  message: z.string(),
  url: z.string(),
  userId: z.string(),
});
