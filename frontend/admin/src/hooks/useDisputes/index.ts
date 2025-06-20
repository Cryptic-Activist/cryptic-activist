import {
	DisputeSeverity,
	DisputeStatus,
	DisputeType
} from '@/stores/disputes/types';
import { disputes, setDisputes, setDisputesCurrentPage } from '@/stores';
import {
	getAverageTradeCompletionTime,
	getTotalActiveTrades,
	getTotalCompletedTradesToday,
	getTotalDisputedTrades,
	getTotalTradeVolume
} from '@/services/dashboard';
import { getDisputes, getFilter } from '@/services/disputes';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import { GetDisputesParams } from '@/services/disputes/types';
import { disputesColumns } from './data';
import { disputesFiltersResolver } from './zod';
import { useAdmin } from '..';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@nanostores/react';

const useDisputes = () => {
	const { admin } = useAdmin();
	const $disputes = useStore(disputes);

	const { register, handleSubmit, setValue, getFieldState, getValues } =
		useForm({
			resolver: disputesFiltersResolver
		});

	const [statusesQuery, servertiesQuery, typesQuery, moderatorsQuery] =
		useQueries({
			queries: [
				{
					queryKey: ['statuses'],
					queryFn: () => getFilter('status'),
					enabled: !!admin.data?.id
				},
				{
					queryKey: ['severities'],
					queryFn: () => getFilter('severity'),
					enabled: !!admin.data?.id
				},
				{
					queryKey: ['types'],
					queryFn: () => getFilter('type'),
					enabled: !!admin.data?.id
				},
				{
					queryKey: ['moderators'],
					queryFn: () => getFilter('moderator'),
					enabled: !!admin.data?.id
				}
			]
		});

	const disputesMutation = useMutation({
		mutationFn: async (params: GetDisputesParams) => {
			if (admin.data?.id) {
				const disputesList = await getDisputes({
					page: params.page,
					pageSize: params.pageSize,
					amount: params?.amount,
					status: params?.status,
					severity: params?.severity,
					type: params?.type,
					moderatorId: params?.moderatorId
				});

				return disputesList;
			}
		},
		onSuccess: (response) => {
			const mappedDisputes = response?.data?.map((d: any) => {
				const complainant = d.raisedBy.username;
				const respondent =
					d.raisedBy.id === d.trade.trader.id
						? d.trade.trader.username
						: d.trade.vendor.username;
				return {
					id: d.id,
					tradeId: d.trade.id,
					complainant,
					respondent,
					type: d.type,
					amount: d.trade.fiatAmount,
					severity: d.severity,
					status: d.status,
					moderator: d.moderator.username,
					createdAt: d.createdAt,
					slaStatus: d.slaDueAt
				};
			});
			setDisputes({
				data: mappedDisputes,
				currentPage: response.currentPage,
				pageSize: response.pageSize,
				totalPages: response.totalPages
			});
		}
	});

	useEffect(() => {
		if (admin.data?.id) {
			disputesMutation.mutate({
				page: $disputes.currentPage,
				pageSize: $disputes.pageSize,
				amount: $disputes.filters?.amount,
				moderatorId: $disputes.filters?.moderator?.id,
				severity: $disputes.filters?.severity,
				status: $disputes.filters?.status,
				type: $disputes.filters?.type
			});
		}
	}, [
		$disputes.totalPages,
		$disputes.currentPage,
		$disputes.pageSize,
		admin.data?.id
	]);

	const [
		totalDisputes,
		openDisputes,
		resolvedToday,
		averageResolution,
		escalatedCases,
		successRate
	] = useQueries({
		queries: [
			{
				queryKey: ['totalDisputes'],
				queryFn: async () => {
					if (admin.data?.id) {
						const recentTrades = await getTotalDisputedTrades();
						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['openDisputes'],
				queryFn: async () => {
					if (admin.data?.id) {
						const averageTradeCompletion =
							await getAverageTradeCompletionTime();
						return averageTradeCompletion;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['resolvedToday'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalActiveTrade = await getTotalActiveTrades();
						return totalActiveTrade;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['averageResolution'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalCompletedTradesToday =
							await getTotalCompletedTradesToday();
						return totalCompletedTradesToday;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['escalatedCases'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalDisputedTrades = await getTotalDisputedTrades();
						return totalDisputedTrades;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['successRate'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalTradeVolume = await getTotalTradeVolume();
						return totalTradeVolume;
					}
				},
				enabled: !!admin.data?.id
			}
		]
	});

	const onChangePage = (page: number) => {
		setDisputesCurrentPage(page);
	};

	const onSubmitFilters = (data: any) => {
		disputesMutation.mutate({
			page: $disputes.currentPage,
			pageSize: $disputes.pageSize,
			amount: data.amount,
			moderatorId: data.moderatorId,
			severity: data.severity,
			status: data.status,
			type: data.type
		});
	};

	const onSelectModeratorFilter = (moderatorId: string) => {
		setDisputes({
			filters: {
				moderator: {
					id: moderatorId
				}
			}
		});
		setValue('moderatorId', moderatorId);
	};

	const onSelectStatusFilter = (status: DisputeStatus) => {
		setDisputes({
			filters: {
				status
			}
		});
		setValue('status', status);
	};

	const onSelectSeverityFilter = (severity: DisputeSeverity) => {
		setDisputes({
			filters: {
				severity
			}
		});
		setValue('severity', severity);
	};

	const onSelectTypeFilter = (type: DisputeType) => {
		setDisputes({
			filters: {
				type
			}
		});
		setValue('type', type);
	};

	const onResetFilters = () => {
		setDisputes({
			filters: undefined
		});
		setValue('amount', undefined);
		setValue('moderatorId', undefined);
		setValue('severity', undefined);
		setValue('type', undefined);
		setValue('status', undefined);
		disputesMutation.mutate({
			page: $disputes.currentPage,
			pageSize: $disputes.pageSize,
			amount: undefined,
			moderatorId: undefined,
			severity: undefined,
			status: undefined,
			type: undefined
		});
	};

	return {
		onChangePage,
		register,
		handleSubmit,
		onSubmitFilters,
		onSelectModeratorFilter,
		onSelectSeverityFilter,
		onSelectStatusFilter,
		onSelectTypeFilter,
		onResetFilters,
		$disputes,
		disputesColumns,
		totalDisputes,
		openDisputes,
		resolvedToday,
		averageResolution,
		escalatedCases,
		successRate,
		statusesQuery,
		servertiesQuery,
		typesQuery,
		moderatorsQuery
	};
};

export default useDisputes;
