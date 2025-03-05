import { z } from 'zod';

export const GetUser = z.object({
  associations: z.string(),
});
