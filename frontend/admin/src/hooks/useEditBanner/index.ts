'use client';

import { getBanner, updateBanner } from '@/services/banners';
import { useMutation, useQuery } from '@tanstack/react-query';

import { bannerEditResolver } from './zod';
import { formatDatetimeLocal } from '@/utils/date';
import useAdmin from '../useAdmin';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export const useEditBanner = (id: string) => {
	const { admin } = useAdmin();
	const router = useRouter();

	const { data: banner, refetch } = useQuery({
		queryKey: ['banner', id],
		queryFn: async () => {
			const response = await getBanner(id);
			return response;
		},
		enabled: !!admin.data?.id,
		staleTime: 0
	});

	const { mutate: updateBannerMutation, isPending: isUpdating } = useMutation({
		mutationFn: async (data: any) => {
			const response = await updateBanner(id, data);
			return response;
		},
		onSuccess: () => {
			refetch();
		}
	});

	const onSubmit = (data: any) => {
		if (admin.data?.id) {
			updateBannerMutation(data, {
				onSuccess: () => {
					router.push('/banners');
				}
			});
		}
	};

	const form = useForm({
		resolver: bannerEditResolver,
		defaultValues: {
			...banner,
			startDate: banner?.startDate ? formatDatetimeLocal(banner.startDate) : '',
			endDate: banner?.endDate ? formatDatetimeLocal(banner.endDate) : ''
		}
	});

	return {
		banner,
		updateBanner: updateBannerMutation,
		isUpdating,
		form,
		onSubmit
	};
};
