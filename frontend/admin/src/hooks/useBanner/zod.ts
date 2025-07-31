import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const bannerSchema = z.object({
	content: z.string().min(1, 'Content is required'),
	targetWebsite: z.string(),
	pages: z.array(z.string()),
	type: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	isActive: z.boolean()
});

export const bannerResolver = zodResolver(bannerSchema);
