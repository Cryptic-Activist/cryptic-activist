import { z } from 'zod';
import { isAddress } from 'ethers';

export const createWalletSchema = z.object({
	adminId: z.string().min(1, { message: 'Admin is required' }),
	walletAddress: z
		.string()
		.min(1, { message: 'Wallet address is required' })
		.refine((value) => isAddress(value), {
			message: 'Invalid wallet address'
		})
});

export type CreateWalletFormValues = z.infer<typeof createWalletSchema>;
