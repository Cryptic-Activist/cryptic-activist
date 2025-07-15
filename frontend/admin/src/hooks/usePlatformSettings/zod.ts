import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const UpdatePublicPlatformSettings = z.object({
	public: z.array(
		z
			.object({
				key: z.string().min(1),
				value: z.union([z.string().min(1), z.boolean()]),
				type: z.enum(['STRING', 'NUMBER', 'BOOLEAN']),
				deletable: z.boolean(),
				canBeDeleted: z.boolean(),
				isEditable: z.boolean(),
				newField: z.boolean().optional()
			})
			.superRefine(({ type, value }, ctx) => {
				if (type === 'NUMBER') {
					// If value is not a string, convert to string for parsing
					const raw = typeof value === 'string' ? value : String(value);
					const parsed = Number(raw);
					if (isNaN(parsed)) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Value must be a valid number for type NUMBER',
							path: ['value']
						});
					}
				}

				if (type === 'BOOLEAN') {
					if (typeof value === 'string') {
						const valLower = value.toLowerCase();
						if (valLower !== 'true' && valLower !== 'false') {
							ctx.addIssue({
								code: z.ZodIssueCode.custom,
								message: 'Value must be "true" or "false" for type BOOLEAN',
								path: ['value']
							});
						}
					} else if (typeof value !== 'boolean') {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message:
								'Value must be a boolean or "true"/"false" string for type BOOLEAN',
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
		z
			.object({
				key: z.string().min(1),
				value: z.union([z.string().min(1), z.boolean()]),
				type: z.enum(['STRING', 'NUMBER', 'BOOLEAN']),
				deletable: z.boolean(),
				canBeDeleted: z.boolean(),
				isEditable: z.boolean(),
				newField: z.boolean().optional()
			})
			.superRefine(({ type, value }, ctx) => {
				if (type === 'NUMBER') {
					// If value is not a string, convert to string for parsing
					const raw = typeof value === 'string' ? value : String(value);
					const parsed = Number(raw);
					if (isNaN(parsed)) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Value must be a valid number for type NUMBER',
							path: ['value']
						});
					}
				}

				if (type === 'BOOLEAN') {
					if (typeof value === 'string') {
						const valLower = value.toLowerCase();
						if (valLower !== 'true' && valLower !== 'false') {
							ctx.addIssue({
								code: z.ZodIssueCode.custom,
								message: 'Value must be "true" or "false" for type BOOLEAN',
								path: ['value']
							});
						}
					} else if (typeof value !== 'boolean') {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message:
								'Value must be a boolean or "true"/"false" string for type BOOLEAN',
							path: ['value']
						});
					}
				}
			})
	)
});

export const updatePrivatePlatformSettings = zodResolver(
	UpdatePrivatePlatformSettings
);
