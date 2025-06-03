import React, { useState } from 'react';
import {
	SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';

import { GenericTableProps } from './types';
import { Pagination } from '@/components';
import styles from './index.module.scss';

const Table = <T extends object>({
	data,
	columns,
	onRowAction,
	titleComponent
}: GenericTableProps<T>) => {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	return (
		<div className={styles.container}>
			{titleComponent}
			<table className={styles.table}>
				<thead className={styles.tableHead}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
									{{
										asc: ' 🔼',
										desc: ' 🔽'
									}[header.column.getIsSorted() as string] ?? null}
								</th>
							))}
							{onRowAction && <th>Actions</th>}
						</tr>
					))}
				</thead>
				<tbody className={styles.tableBody}>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} title={cell.getValue() as string}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
							{onRowAction && (
								<td>
									<button
										className={styles.view}
										onClick={() => onRowAction(row.original)}
									>
										View
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
			{data.length > 0 && (
				// <Pagination />
				<div>
					<div>
						<button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</button>
						<button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</button>
					</div>
					<span>
						Page {table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount()}
					</span>
				</div>
			)}
		</div>
	);
};

export default Table;
