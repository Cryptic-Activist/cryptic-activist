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

import { ColumnDef } from '@tanstack/react-table';
import { RecentTrade } from './types';
import { getLocaleFullDateString } from '@/utils/date';
import { toUpperCase } from '@/utils';
import { useAdmin } from '..';

const useDashboard = () => {
	const { admin } = useAdmin();
	const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const recentTradesColumns: ColumnDef<RecentTrade>[] = [
		{ header: 'ID', accessorKey: 'id' },
		{ header: 'Vendor', accessorKey: 'vendor' },
		{ header: 'Trader', accessorKey: 'trader' },
		{ header: 'Amount', accessorKey: 'amount' },
		{ header: 'Crypto', accessorKey: 'crypto' },
		{ header: 'Status', accessorKey: 'status' },
		{ header: 'Started At', accessorKey: 'startedAt' }
	];

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
				startedAt: getLocaleFullDateString(new Date(rt.startedAt))
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
					console.log({ admin });
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
					console.log({ admin });
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
					console.log({ admin });
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
					console.log({ admin });
					if (admin.data?.id) {
						const recentTrades = await getTotalTradeVolume();

						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			}
		]
	});

	const handleRowAction = () => {
		console.log('tssted');
	};

	useEffect(() => {
		recentTradesMutation.mutate();
	}, [totalPages, currentPage, pageSize, admin.data?.id]);

	const onChangePage = (page: number) => {
		setCurrentPage(page);
	};

	return {
		recentTrades,
		recentTradesColumns,
		handleRowAction,
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
