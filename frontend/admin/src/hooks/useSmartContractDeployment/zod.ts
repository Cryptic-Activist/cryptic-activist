import { z } from 'zod';

export const deploymentEscrowFormSchema = z.object({
	type: z.string().min(2, { message: 'Smart Contract is required' }),
	chainId: z.string().min(2, { message: 'Chain is required' }),
	defaultFeeRate: z
		.number()
		.min(0, { message: 'Fee rate must be positive' })
		.max(100, { message: 'Fee rate cannot exceed 100%' }),
	defaultProfitMargin: z
		.number()
		.min(0, { message: 'Profit margin must be positive' })
		.max(100, { message: 'Profit margin cannot exceed 100%' }),
	platformWallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
		message: 'Invalid Ethereum address format'
	})
});

export type DeploymentEscrowFormData = z.infer<
	typeof deploymentEscrowFormSchema
>;

export const deploymentPremiumFormSchema = z.object({
	type: z.string().min(2, { message: 'Smart Contract is required' }),
	chainId: z.string().min(2, { message: 'Chain is required' }),
	monthlyPrice: z
		.number()
		.min(0, { message: 'Monthly price must be positive' }),
	yearlyPrice: z.number().min(0, { message: 'Yearly price must be positive' }),
	platformWallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
		message: 'Invalid Ethereum address format'
	})
});

export type DeploymentPremiumFormData = z.infer<
	typeof deploymentPremiumFormSchema
>;
