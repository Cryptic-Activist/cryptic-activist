import { z } from 'zod';

export const Banner = z.object({
  content: z.string(),
  targetWebsite: z.string(),
  pages: z.array(z.string()),
  type: z.enum(['WARNING', 'NEW_FEATURE', 'ANNOUNCEMENT']),
  startDate: z.string(),
  endDate: z.string().optional(),
  isActive: z.boolean(),
  adminId: z.string().min(2),
});
