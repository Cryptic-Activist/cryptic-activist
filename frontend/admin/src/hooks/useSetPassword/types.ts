import { setPasswordSchema } from './zod';
import { z } from 'zod';

export type SetPasswordValues = z.infer<typeof setPasswordSchema>;
