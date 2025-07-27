import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const setPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(64, 'Password must be at most 64 characters'),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

export const setPasswordResolver = zodResolver(setPasswordSchema);
