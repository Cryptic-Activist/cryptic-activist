import { z } from 'zod';

export const deploymentEscrowFormSchema = z
	.object({
		type: z.string().min(2, { message: 'Smart Contract is required' }),
		chainId: z.string().min(2, { message: 'Chain is required' }),
		defaultFeeRate: z.string(),
		defaultProfitMargin: z.string(),
		platformWallet: z
			.string()
			.min(2, { message: 'Platform Wallet is required' })
	})
	.superRefine((data, ctx) => {
		const { defaultFeeRate, defaultProfitMargin } = data;

		const fee = parseFloat(defaultFeeRate);
		if (isNaN(fee)) {
			ctx.addIssue({
				path: ['defaultFeeRate'],
				code: z.ZodIssueCode.custom,
				message: 'Fee rate must be a valid number'
			});
		} else {
			if (fee < 0) {
				ctx.addIssue({
					path: ['defaultFeeRate'],
					code: z.ZodIssueCode.custom,
					message: 'Fee rate must be positive'
				});
			}
			if (fee > 100) {
				ctx.addIssue({
					path: ['defaultFeeRate'],
					code: z.ZodIssueCode.custom,
					message: 'Fee rate cannot exceed 100%'
				});
			}
		}

		const margin = parseFloat(defaultProfitMargin);
		if (isNaN(margin)) {
			ctx.addIssue({
				path: ['defaultProfitMargin'],
				code: z.ZodIssueCode.custom,
				message: 'Profit margin must be a valid number'
			});
		} else {
			if (margin < 0) {
				ctx.addIssue({
					path: ['defaultProfitMargin'],
					code: z.ZodIssueCode.custom,
					message: 'Profit margin must be positive'
				});
			}
			if (margin > 100) {
				ctx.addIssue({
					path: ['defaultProfitMargin'],
					code: z.ZodIssueCode.custom,
					message: 'Profit margin cannot exceed 100%'
				});
			}
		}
	});

export type DeploymentEscrowFormData = z.infer<
	typeof deploymentEscrowFormSchema
>;

export const deploymentPremiumFormSchema = z
	.object({
		type: z.string().min(2, { message: 'Smart Contract is required' }),
		chainId: z.string().min(2, { message: 'Chain is required' }),
		monthlyPrice: z.string(),
		yearlyPrice: z.string(),
		platformWallet: z
			.string()
			.min(2, { message: 'Platform Wallet is required' })
	})
	.superRefine((data, ctx) => {
		const { monthlyPrice, yearlyPrice } = data;

		const monthly = parseFloat(monthlyPrice);
		if (isNaN(monthly)) {
			ctx.addIssue({
				path: ['monthlyPrice'],
				code: z.ZodIssueCode.custom,
				message: 'Monthly price must be a valid number'
			});
		} else if (monthly < 0) {
			ctx.addIssue({
				path: ['monthlyPrice'],
				code: z.ZodIssueCode.custom,
				message: 'Monthly price must be positive'
			});
		}

		const yearly = parseFloat(yearlyPrice);
		if (isNaN(yearly)) {
			ctx.addIssue({
				path: ['yearlyPrice'],
				code: z.ZodIssueCode.custom,
				message: 'Yearly price must be a valid number'
			});
		} else if (yearly < 0) {
			ctx.addIssue({
				path: ['yearlyPrice'],
				code: z.ZodIssueCode.custom,
				message: 'Yearly price must be positive'
			});
		}
	});

export type DeploymentPremiumFormData = z.infer<
	typeof deploymentPremiumFormSchema
>;
