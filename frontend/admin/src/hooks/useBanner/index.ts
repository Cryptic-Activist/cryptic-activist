'use client';

import { createBanner, getBanners } from '@/services/banners';
import { useMutation, useQuery } from '@tanstack/react-query';

import { BACKEND } from '@/constants';
import { bannerResolver } from './zod';
import { fetchPost } from '@/services/axios';
import useAdmin from '../useAdmin';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export const useBanner = () => {
	const router = useRouter();
	const { admin } = useAdmin();

	const { data: banners, refetch } = useQuery({
		queryKey: ['banners'],
		queryFn: getBanners,
		enabled: !!admin?.data?.id
	});

	const { mutate: createBannerMutate, isPending: isCreating } = useMutation({
		mutationFn: createBanner,
		onSuccess: () => {
			refetch();
		}
	});

	const { mutate: deleteBanner } = useMutation({
		mutationFn: async (id: string) => {
			await fetch(`/banners/${id}`, { method: 'DELETE' });
		},
		onSuccess: () => {
			refetch();
		}
	});

	const onSubmit = (data: any) => {
		if (admin.data?.id) {
			createBannerMutate(
				{ ...data, adminId: admin.data?.id },
				{
					onSuccess: () => {
						router.push('/banners');
					}
				}
			);
		}
	};

	const form = useForm({
		resolver: bannerResolver,
		defaultValues: {
			content: '',
			targetWebsite: 'public',
			pages: [],
			type: 'ANNOUNCEMENT',
			startDate: '',
			endDate: '',
			isActive: true
		}
	});

	return {
		banners,
		createBannerMutate,
		isCreating,
		deleteBanner,
		form,
		onSubmit
	};
};
