import { ReactElement, ReactNode } from 'react';

import { ColumnDef } from '@tanstack/react-table';

export type GenericTableProps<T extends object> = {
	data: T[];
	columns: ColumnDef<T, any>[];
	titleComponent?: ReactElement;
	currentPage: number;
	totalPages: number;
	onChangePage: (page: number) => void;
	actionButtons?: (row: T) => {
		label: string;
		onClick: () => void;
		className?: string;
	}[];
};
