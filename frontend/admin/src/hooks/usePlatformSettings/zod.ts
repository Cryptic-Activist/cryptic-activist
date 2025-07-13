import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const UpdatePublicPlatformSettings = z.object({
	public: z.array(
		z.object({
			key: z.string().min(1),
			value: z.string().min(1),
			type: z.enum(['STRING', 'NUMBER', 'BOOLEAN']),
			canBeDeleted: z.boolean()
		})
	)
});

export const updatePublicPlatformSettings = zodResolver(
	UpdatePublicPlatformSettings
);

const UpdatePrivatePlatformSettings = z.object({
	private: z.array(
		z.object({
			key: z.string().min(1),
			value: z.string().min(1),
			type: z.enum(['STRING', 'NUMBER', 'BOOLEAN']),
			canBeDeleted: z.boolean()
		})
	)
});

export const updatePrivatePlatformSettings = zodResolver(
	UpdatePrivatePlatformSettings
);
