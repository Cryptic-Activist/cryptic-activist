import type { ColumnDef } from '@tanstack/react-table';
import type { KYC } from '@/stores/kycs/types';

export const kycsColumns: ColumnDef<KYC>[] = [
	{ header: 'ID', accessorKey: 'id' },
	{ header: 'Username', accessorKey: 'username' },
	{ header: 'Submitted At', accessorKey: 'submittedAt' },
	{ header: 'Status', accessorKey: 'status' }
];
