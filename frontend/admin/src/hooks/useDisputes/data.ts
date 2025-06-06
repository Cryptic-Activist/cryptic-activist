import { ColumnDef } from '@tanstack/react-table';
import { Trade } from './types';

export const tradesColumns: ColumnDef<Trade>[] = [
	{ header: 'ID', accessorKey: 'id' },
	{ header: 'Vendor', accessorKey: 'vendor' },
	{ header: 'Trader', accessorKey: 'trader' },
	{ header: 'Crypto', accessorKey: 'crypto' },
	{ header: 'Crypto Amount', accessorKey: 'cryptoAmount' },
	{ header: 'Fiat Amount', accessorKey: 'fiatAmount' },
	{ header: 'Payment Method', accessorKey: 'paymentMethod' },
	{ header: 'Status', accessorKey: 'status' },
	{ header: 'Started At', accessorKey: 'startedAt' }
];
