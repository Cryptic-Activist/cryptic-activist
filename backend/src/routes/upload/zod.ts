import { z } from 'zod';

export const UploadFilesBody = z.object({
  folder: z.string().min(1),
});
