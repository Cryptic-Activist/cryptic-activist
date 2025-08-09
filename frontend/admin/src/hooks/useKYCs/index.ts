'use client';

import {
	getFilter,
	getKYCs,
	getTotalApprovedKYC,
	getTotalKYCApplications,
	getTotalPendingKYC,
	getTotalRejectedKYC
} from '@/services/kycs';
import { kycs, setKYCs, setKYCsCurrentPage } from '@/stores';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import type { GetKYCsParams } from '@/services/kycs/types';
import type { KYCStatus } from '@/stores/kycs/types';
import { kycsColumns } from './data';
import { kycsFiltersResolver } from './zod';
import { useAdmin } from '..';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@nanostores/react';

const useKYCs = () => {
	const { admin } = useAdmin();
	const $kycs = useStore(kycs);

	const { register, handleSubmit, setValue, getFieldState, getValues } =
		useForm({
			resolver: kycsFiltersResolver
		});

	const statusesQuery = useQuery({
		queryKey: ['statuses'],
		queryFn: () => getFilter('status'),
		enabled: !!admin.data?.id
	});

	const kycsMutation = useMutation({
		mutationFn: async (params: GetKYCsParams) => {
			if (admin.data?.id) {
				const disputesList = await getKYCs({
					page: params.page,
					pageSize: params.pageSize,
					status: params?.status,
					username: params?.username
				});

				return disputesList;
			}
		},
		onSuccess: (response) => {
			const mappedKYCs = response?.data?.map((d: any) => {
				const username = d.user.username;
				return {
					id: d.id,
					username,
					submittedAt: d.submittedAt,
					status: d.status
				};
			});
			setKYCs({
				data: mappedKYCs,
				currentPage: response.currentPage,
				pageSize: response.pageSize,
				totalPages: response.totalPages
			});
		}
	});

	useEffect(() => {
		if (admin.data?.id) {
			kycsMutation.mutate({
				page: $kycs.currentPage,
				pageSize: $kycs.pageSize,
				status: $kycs.filters?.status,
				username: $kycs.filters?.username
			});
		}
	}, [$kycs.totalPages, $kycs.currentPage, $kycs.pageSize, admin.data?.id]);

	const [
		totalPendingKYC,
		totalApprovedKYC,
		totalRejectedKYC,
		totalKYCApplications
	] = useQueries({
		queries: [
			{
				queryKey: ['totalPendingKYC'],
				queryFn: async () => {
					if (admin.data?.id) {
						const recentTrades = await getTotalPendingKYC();
						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['totalApprovedKYC'],
				queryFn: async () => {
					if (admin.data?.id) {
						const averageTradeCompletion = await getTotalApprovedKYC();
						return averageTradeCompletion;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['totalRejectedKYC'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalActiveTrade = await getTotalRejectedKYC();
						return totalActiveTrade;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['totalApplications'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalCompletedTradesToday = await getTotalKYCApplications();
						return totalCompletedTradesToday;
					}
				},
				enabled: !!admin.data?.id
			}
		]
	});

	const onChangePage = (page: number) => {
		setKYCsCurrentPage(page);
	};

	const onSubmitFilters = (data: any) => {
		kycsMutation.mutate({
			page: $kycs.currentPage,
			pageSize: $kycs.pageSize,
			username: data.username,
			status: data.status
		});
	};

	const onSelectStatusFilter = (status: KYCStatus) => {
		setKYCs({
			filters: {
				status
			}
		});
		setValue('status', status);
	};

	const onResetFilters = () => {
		setKYCs({
			filters: undefined
		});
		setValue('username', undefined);
		setValue('status', undefined);
		kycsMutation.mutate({
			page: $kycs.currentPage,
			pageSize: $kycs.pageSize,
			username: undefined,
			status: undefined
		});
	};

	return {
		onChangePage,
		register,
		handleSubmit,
		onSubmitFilters,
		onSelectStatusFilter,
		onResetFilters,
		$kycs,
		kycsColumns,
		totalApprovedKYC,
		totalKYCApplications,
		totalPendingKYC,
		totalRejectedKYC,
		statusesQuery
	};
};

export default useKYCs;
