import { ColumnDef } from '@tanstack/react-table';
import { Dispute } from '@/stores/disputes/types';

export const disputesColumns: ColumnDef<Dispute>[] = [
	{ header: 'ID', accessorKey: 'id' },
	{ header: 'Complainant', accessorKey: 'complainant' },
	{ header: 'Respondent', accessorKey: 'respondent' },
	{ header: 'Type', accessorKey: 'type' },
	{ header: 'Amount', accessorKey: 'amount' },
	{ header: 'Severity', accessorKey: 'severity' },
	{ header: 'Status', accessorKey: 'status' },
	{ header: 'Moderator', accessorKey: 'moderator' },
	{ header: 'Created At', accessorKey: 'createdAt' },
	{ header: 'SLA Status', accessorKey: 'slaStatus' }
];
