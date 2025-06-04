import {
	getAverageTradeCompletionTime,
	getTotalActiveTrades,
	getTotalCompletedTradesToday,
	getTotalDisputedTrades,
	getTotalTradeVolume,
	getTotalTrades
} from '@/services/dashboard';
import { setCurrentPage, setTrades, trades } from '@/stores';
import { useMutation, useQueries } from '@tanstack/react-query';

import { ColumnDef } from '@tanstack/react-table';
import { getLocaleFullDateString } from '@/utils/date';
import { getTrades } from '@/services/trades';
import { toUpperCase } from '@/utils';
import { tradesColumns } from './data';
import { useAdmin } from '..';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

const useTrades = () => {
	const { admin } = useAdmin();
	const $trades = useStore(trades);

	const tradesMutation = useMutation({
		mutationFn: async () => {
			if (admin.data?.id) {
				const recentTrades = await getTrades({
					page: $trades.currentPage,
					pageSize: $trades.pageSize
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
				startedAt: getLocaleFullDateString(new Date(rt.startedAt))
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
		tradesMutation.mutate();
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
					console.log({ admin });
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
					console.log({ admin });
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
					console.log({ admin });
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
					console.log({ admin });
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
					console.log({ admin });
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
					console.log({ admin });
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

	const handleRowAction = () => {
		console.log('tssted');
	};

	return {
		onChangePage,
		handleRowAction,
		$trades,
		tradesColumns,
		totalTrades,
		activeTrades,
		completedTradesToday,
		disputedTrades,
		tradeVolume,
		averageCompletion
	};
};

export default useTrades;
