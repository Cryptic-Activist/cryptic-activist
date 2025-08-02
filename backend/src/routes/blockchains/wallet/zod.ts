import { z } from 'zod';

export const GetAdminArbitratorWallet = z.object({
  adminId: z.string().min(2),
});

export const CreateAdminWallet = z.object({
  adminId: z.string().min(2),
  walletAddress: z.string().min(2),
});

export const SoftDeleteAdminWallet = z.object({
  walletId: z.string().min(2),
});
