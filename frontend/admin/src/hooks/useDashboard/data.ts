import type { ColumnDef } from '@tanstack/react-table';
import type { RecentTrade } from './types';

export const recentTradesColumns: ColumnDef<RecentTrade>[] = [
	{ header: 'ID', accessorKey: 'id' },
	{ header: 'Vendor', accessorKey: 'vendor' },
	{ header: 'Trader', accessorKey: 'trader' },
	{ header: 'Amount', accessorKey: 'amount' },
	{ header: 'Crypto', accessorKey: 'crypto' },
	{ header: 'Status', accessorKey: 'status' },
	{ header: 'Started At', accessorKey: 'startedAt' }
];
