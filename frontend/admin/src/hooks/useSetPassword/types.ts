import type { setPasswordSchema } from './zod';
import type { z } from 'zod';

export type SetPasswordValues = z.infer<typeof setPasswordSchema>;
