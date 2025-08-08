'use client';

import {
	getAverageTradeCompletionTime,
	getTotalActiveTrades,
	getTotalCompletedTradesToday,
	getTotalDisputedTrades,
	getTotalTradeVolume,
	getTotalTrades
} from '@/services/dashboard';
import { setCurrentPage, setTrades, trades } from '@/stores';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import type { GetTradesParams } from '@/services/trades/types';
import { getCryptocurenciesFilters } from '@/services/cryptocurrencies';
import { getLocaleFullDateString } from '@/utils/date';
import { getTrades } from '@/services/trades';
import { toUpperCase } from '@/utils';
import { tradesColumns } from './data';
import { tradesFiltersResolver } from './zod';
import { useAdmin } from '..';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@nanostores/react';

const useTrades = () => {
	const { admin } = useAdmin();
	const $trades = useStore(trades);

	const { register, handleSubmit, setValue, getFieldState, getValues } =
		useForm({
			resolver: tradesFiltersResolver
		});

	const cryptocurrenciesQuery = useQuery({
		queryKey: ['cryptocurrencies'],
		queryFn: getCryptocurenciesFilters,
		enabled: !!admin.data?.id
	});

	const tradesMutation = useMutation({
		mutationFn: async (params: GetTradesParams) => {
			if (admin.data?.id) {
				const recentTrades = await getTrades({
					page: params.page,
					pageSize: params.pageSize,
					amount: params?.amount,
					cryptocurrencyId: params.cryptocurrencyId,
					dateRageEnd: params.dateRageEnd,
					dateRageStart: params.dateRageStart,
					status: params.status,
					username: params.username
				});

				return recentTrades;
			}
		},
		onSuccess: (response) => {
			const mappedTrades = response?.data?.map((rt: any) => ({
				id: rt.id,
				vendor: rt.vendor.username,
				trader: rt.trader.username,
				crypto: toUpperCase(rt.cryptocurrency.symbol),
				cryptoAmount: rt.cryptocurrencyAmount,
				fiatAmount: `${rt.fiatAmount} ${toUpperCase(rt.fiat?.symbol)}`,
				paymentMethod: rt.paymentMethod.name,
				status: rt.status,
				startedAt: getLocaleFullDateString(rt.startedAt)
			}));
			setTrades({
				data: mappedTrades,
				currentPage: response.currentPage,
				pageSize: response.pageSize,
				totalPages: response.totalPages
			});
		}
	});

	useEffect(() => {
		if (admin.data?.id) {
			tradesMutation.mutate({
				page: $trades.currentPage,
				pageSize: $trades.pageSize,
				amount: $trades.filters?.amount,
				cryptocurrencyId: $trades.filters?.cryptocurrencyId,
				dateRageEnd: $trades.filters?.dateRageEnd,
				dateRageStart: $trades.filters?.dateRageStart,
				status: $trades.filters?.status,
				username: $trades.filters?.username
			});
		}
	}, [
		$trades.totalPages,
		$trades.currentPage,
		$trades.pageSize,
		admin.data?.id
	]);

	const [
		totalTrades,
		activeTrades,
		completedTradesToday,
		disputedTrades,
		tradeVolume,
		averageCompletion
	] = useQueries({
		queries: [
			{
				queryKey: ['totalUsers'],
				queryFn: async () => {
					if (admin.data?.id) {
						const recentTrades = await getTotalTrades();
						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['activeTrades'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalActiveTrade = await getTotalActiveTrades();
						return totalActiveTrade;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['completedTradesToday'],
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
				queryKey: ['disputedTrades'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalDisputedTrades = await getTotalDisputedTrades();
						return totalDisputedTrades;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['tradeVolume'],
				queryFn: async () => {
					if (admin.data?.id) {
						const totalTradeVolume = await getTotalTradeVolume();
						return totalTradeVolume;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['averageCompletion'],
				queryFn: async () => {
					if (admin.data?.id) {
						const averageTradeCompletion =
							await getAverageTradeCompletionTime();
						return averageTradeCompletion;
					}
				},
				enabled: !!admin.data?.id
			}
		]
	});

	const onChangePage = (page: number) => {
		setCurrentPage(page);
	};

	const onSubmitFilters = (data: any) => {
		tradesMutation.mutate({
			page: $trades.currentPage,
			pageSize: $trades.pageSize,
			amount: data?.amount,
			cryptocurrencyId: data?.cryptocurrencyId,
			dateRageEnd: data?.dateRangeEnd
				? data?.dateRangeEnd.toDateString()
				: undefined,
			dateRageStart: data?.dateRangeStart
				? data?.dateRangeStart.toDateString()
				: undefined,
			status: data?.status,
			username: data?.username
		});
	};

	const onSelectDateStartFilter = (date?: Date) => {
		setTrades({
			filters: {
				dateRageStart: date
			}
		});
		setValue('dateRangeStart', date);
	};

	const onSelectDateEndFilter = (date?: Date) => {
		setTrades({
			filters: {
				dateRageEnd: date
			}
		});
		setValue('dateRangeEnd', date);
	};

	const onResetFilters = () => {
		setTrades({
			filters: undefined
		});
		setValue('amount', undefined);
		setValue('cryptocurrencyId', undefined);
		setValue('dateRangeEnd', undefined);
		setValue('dateRangeStart', undefined);
		setValue('status', undefined);
		setValue('username', undefined);
		tradesMutation.mutate({
			page: $trades.currentPage,
			pageSize: $trades.pageSize,
			amount: undefined,
			cryptocurrencyId: undefined,
			dateRageEnd: undefined,
			dateRageStart: undefined,
			status: undefined,
			username: undefined
		});
	};

	return {
		onChangePage,
		register,
		handleSubmit,
		onSubmitFilters,
		onSelectDateEndFilter,
		onSelectDateStartFilter,
		onResetFilters,
		$trades,
		tradesColumns,
		totalTrades,
		activeTrades,
		completedTradesToday,
		disputedTrades,
		tradeVolume,
		averageCompletion,
		cryptocurrencyFilters: cryptocurrenciesQuery
	};
};

export default useTrades;
