'use client';

import {
	getRecentTrades,
	getTotalActiveOffers,
	getTotalCompletedTrades,
	getTotalTradeVolume,
	getTotalUsers
} from '@/services/dashboard';
import { useEffect, useState } from 'react';
import { useMutation, useQueries } from '@tanstack/react-query';

import { RecentTrade } from './types';
import { getLocaleFullDateString } from '@/utils/date';
import { recentTradesColumns } from './data';
import { toUpperCase } from '@/utils';
import { useAdmin } from '..';

const useDashboard = () => {
	const { admin } = useAdmin();
	const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const recentTradesMutation = useMutation({
		mutationKey: ['recentTrades'],
		mutationFn: async () => {
			if (admin.data?.id) {
				const recentTrades = await getRecentTrades({
					page: currentPage,
					pageSize
				});

				return recentTrades;
			}
		},
		onSuccess: (response) => {
			const mappedRecentTrades = response?.data?.map((rt: any) => ({
				id: rt.id,
				vendor: rt.vendor.username,
				trader: rt.trader.username,
				amount: `${rt.fiatAmount} ${toUpperCase(rt.fiat?.symbol)}`,
				crypto: toUpperCase(rt.cryptocurrency.symbol),
				status: rt.status,
				startedAt: getLocaleFullDateString(rt.startedAt)
			}));
			setRecentTrades(mappedRecentTrades);
			setTotalPages(response.totalPages);
			setCurrentPage(response.currentPage);
			setPageSize(response.pageSize);
		}
	});

	const [
		totalUsersQuery,
		activeOffersQuery,
		completedTradesQuery,
		totalVolumeQuery
	] = useQueries({
		queries: [
			{
				queryKey: ['totalUsers'],
				queryFn: async () => {
					if (admin.data?.id) {
						const recentTrades = await getTotalUsers();
						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['activeOffers'],
				queryFn: async () => {
					if (admin.data?.id) {
						const recentTrades = await getTotalActiveOffers();
						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['completedTrades'],
				queryFn: async () => {
					if (admin.data?.id) {
						const recentTrades = await getTotalCompletedTrades();
						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			},
			{
				queryKey: ['totalVolume'],
				queryFn: async () => {
					if (admin.data?.id) {
						const recentTrades = await getTotalTradeVolume();
						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			}
		]
	});

	useEffect(() => {
		recentTradesMutation.mutate();
	}, [totalPages, currentPage, pageSize, admin.data?.id]);

	const onChangePage = (page: number) => {
		setCurrentPage(page);
	};

	return {
		recentTrades,
		recentTradesColumns,
		totalUsersQuery,
		activeOffersQuery,
		completedTradesQuery,
		totalVolumeQuery,
		onChangePage,
		totalPages,
		currentPage,
		pageSize
	};
};

export default useDashboard;
