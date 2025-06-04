import { ReactElement, ReactNode } from 'react';

import { ColumnDef } from '@tanstack/react-table';

export type GenericTableProps<T extends object> = {
	data: T[];
	columns: ColumnDef<T, any>[];
	titleComponent?: ReactElement;
	onRowAction?: (row: T) => void;
	onChangePage: (page: number) => void;
	currentPage: number;
	totalPages: number;
};
