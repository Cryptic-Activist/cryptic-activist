import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const UpdatePublicPlatformSettings = z.object({
	public: z.array(
		z
			.object({
				key: z.string().min(1),
				value: z.string().min(1),
				type: z.enum(['STRING', 'NUMBER', 'BOOLEAN']),
				canBeDeleted: z.boolean()
			})
			.superRefine(({ type, value }, ctx) => {
				if (type === 'NUMBER') {
					const parsed = Number(value);
					if (isNaN(parsed)) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Value must be a valid number for type NUMBER',
							path: ['value']
						});
					}
				}

				if (type === 'BOOLEAN') {
					const valLower = value.toLowerCase();
					if (valLower !== 'true' && valLower !== 'false') {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Value must be "true" or "false" for type BOOLEAN',
							path: ['value']
						});
					}
				}
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
			value: z.union([z.string().min(1), z.number(), z.boolean()]),
			type: z.enum(['STRING', 'NUMBER', 'BOOLEAN']),
			canBeDeleted: z.boolean()
		})
	)
});

export const updatePrivatePlatformSettings = zodResolver(
	UpdatePrivatePlatformSettings
);
