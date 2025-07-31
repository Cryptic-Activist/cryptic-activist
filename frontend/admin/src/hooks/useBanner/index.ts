'use client';

import { createBanner, getBanners } from '@/services/banners';
import { useMutation, useQuery } from '@tanstack/react-query';

import { BACKEND } from '@/constants';
import { bannerResolver } from './zod';
import { fetchPost } from '@/services/axios';
import { useForm } from 'react-hook-form';

export const useBanner = () => {
	const { data: banners, refetch } = useQuery({
		queryKey: ['banners'],
		queryFn: getBanners
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

	const form = useForm({
		resolver: bannerResolver,
		defaultValues: {
			content: '',
			targetWebsite: 'public',
			pages: [],
			type: 'announcement',
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
		form
	};
};
