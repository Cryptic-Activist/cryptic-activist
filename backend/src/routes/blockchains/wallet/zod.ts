import { z } from 'zod';

export const GetAdminArbitratorWallet = z.object({
  adminId: z.string().min(2),
});
