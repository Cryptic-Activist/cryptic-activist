'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getBanner } from '@/services/banners';
import useAdmin from '../useAdmin';
import { useForm } from 'react-hook-form';
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

export const useEditBanner = (id: string) => {
	const { admin } = useAdmin();

	const { data: banner, refetch } = useQuery({
		queryKey: ['banner', id],
		queryFn: async () => {
			const response = await getBanner(id);
			return response;
		},
		enabled: !!admin.data?.id
	});

	const { mutate: updateBanner, isPending: isUpdating } = useMutation({
		mutationFn: async (data: any) => {
			const res = await fetch(`/banners/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});
			return res.json();
		},
		onSuccess: () => {
			refetch();
		}
	});

	if (banner?.startDate)
		console.log({
			defaultValues: {
				...banner,
				startDate: banner?.startDate
					? new Date(banner.startDate).toISOString().slice(0, 16)
					: '',
				endDate: banner?.endDate
					? new Date(banner.endDate).toISOString().slice(0, 16)
					: ''
			}
		});

	const form = useForm({
		resolver: zodResolver(bannerSchema),
		defaultValues: {
			...banner,
			startDate: banner?.startDate
				? new Date(banner.startDate).toISOString().slice(0, 16)
				: '',
			endDate: banner?.endDate
				? new Date(banner.endDate).toISOString().slice(0, 16)
				: ''
		}
	});
	const watched = form.watch();

	console.log({ watched });

	return {
		banner,
		updateBanner,
		isUpdating,
		form
	};
};
