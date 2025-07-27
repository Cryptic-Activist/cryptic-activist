import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	username: z.string().min(1, 'Username is required'),
	email: z.string().email('Invalid email address'),
	roles: z.array(z.string()).min(1, 'At least one role is required')
});

export const adminResolver = zodResolver(schema);
