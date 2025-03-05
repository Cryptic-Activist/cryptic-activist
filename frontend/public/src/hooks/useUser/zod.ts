import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const LoginCredrentials = z.object({
  username: z.string().min(8),
  password: z.string().min(8),
});

export const loginResolver = zodResolver(LoginCredrentials);
