import { z } from 'zod';

export const CreateBanner = z.object({
  content: z.string(),
  targetWebsite: z.string(),
  pages: z.array(z.string()),
  type: z.enum(['warning', 'new_feature', 'announcement']),
  startDate: z.string(),
  endDate: z.string().optional(),
  isActive: z.boolean(),
});
