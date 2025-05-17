import { z } from 'zod';

export const ZodFirstName = z.string().min(4);
export const ZodLastName = z.string().min(4);
export const ZodUsername = z.string().min(8);
export const ZodPassword = z.string().min(8);
export const ZodEmail = z.string().email('Invalid email address');
export const ZodReferralCode = z.string().optional();
export const ZodConfirmPassword = z.string().min(8);
export const ZodPrivateKey = z.string().min(2, { message: 'Required' });
