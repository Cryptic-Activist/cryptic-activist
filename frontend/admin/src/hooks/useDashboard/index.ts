'use client';

import {
	getRecentTrades,
	getTotalActiveOffers,
	getTotalCompletedTrades,
	getTotalTradeVolume,
	getTotalUsers
} from '@/services/dashboard';
import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { RecentTrade } from './types';
import { getLocaleFullDateString } from '@/utils/date';
import { toUpperCase } from '@/utils';
import { useAdmin } from '..';
import { useQueries } from '@tanstack/react-query';

const useDashboard = () => {
	const { admin } = useAdmin();
	const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([]);

	const recentTradesColumns: ColumnDef<RecentTrade>[] = [
		{ header: 'ID', accessorKey: 'id' },
		{ header: 'Vendor', accessorKey: 'vendor' },
		{ header: 'Trader', accessorKey: 'trader' },
		{ header: 'Amount', accessorKey: 'amount' },
		{ header: 'Crypto', accessorKey: 'crypto' },
		{ header: 'Status', accessorKey: 'status' },
		{ header: 'Started At', accessorKey: 'startedAt' }
	];

	const [
		recentTradesQuery,
		totalUsersQuery,
		activeOffersQuery,
		completedTradesQuery,
		totalVolumeQuery
	] = useQueries({
		queries: [
			{
				queryKey: ['recentTrades'],
				queryFn: async () => {
					console.log({ admin });
					if (admin.data?.id) {
						const recentTrades = await getRecentTrades();

						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			},
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
		if (recentTradesQuery.data) {
			const mappedRecentTrades = recentTradesQuery.data?.map((rt: any) => ({
				id: rt.id,
				vendor: rt.vendor.username,
				trader: rt.trader.username,
				amount: `${rt.fiatAmount} ${toUpperCase(rt.fiat?.symbol)}`,
				crypto: toUpperCase(rt.cryptocurrency.symbol),
				status: rt.status,
				startedAt: getLocaleFullDateString(new Date(rt.startedAt))
			}));
			setRecentTrades(mappedRecentTrades);
		}
	}, [recentTradesQuery.data]);

	return {
		recentTrades,
		recentTradesColumns,
		handleRowAction,
		totalUsersQuery,
		activeOffersQuery,
		completedTradesQuery,
		totalVolumeQuery
	};
};

export default useDashboard;
