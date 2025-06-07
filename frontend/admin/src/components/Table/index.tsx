import { DynamicIcon, Pagination } from '@/components';
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
import styles from './index.module.scss';

const Table = <T extends object>({
	data,
	columns,
	titleComponent,
	currentPage,
	totalPages,
	onChangePage,
	actionButtons
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
									<span>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</span>
									{header.column.getIsSorted() === 'asc' && (
										<DynamicIcon
											iconName="FaSortUp"
											size={16}
											className={styles.sortUp}
										/>
									)}
									{header.column.getIsSorted() === 'desc' && (
										<DynamicIcon
											iconName="FaSortDown"
											size={16}
											className={styles.sortDown}
										/>
									)}
								</th>
							))}
							{actionButtons && <th>Actions</th>}
						</tr>
					))}
				</thead>
				<tbody className={styles.tableBody}>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								const isStatusColumn =
									cell.column.id === 'status' || cell.column.id === 'type';
								const statusCellStyle = isStatusColumn ? styles.statusCell : '';
								return (
									<td
										key={cell.id}
										title={cell.getValue() as string}
										className={statusCellStyle}
									>
										{isStatusColumn ? (
											<span
												className={`${styles.badge} ${
													styles[cell.getValue() as string]
												}`}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</span>
										) : (
											flexRender(cell.column.columnDef.cell, cell.getContext())
										)}
									</td>
								);
							})}
							{actionButtons && (
								<td>
									<div className={styles.actionsWrapper}>
										{actionButtons(row.original).map((action) => (
											<button
												key={action.label}
												className={
													action.className
														? styles[action.className]
														: styles.defaultAction
												}
												onClick={action.onClick}
											>
												{action.label}
											</button>
										))}
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
			{data?.length > 0 && (
				<Pagination
					onPageChange={onChangePage}
					currentPage={currentPage}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};

export default Table;
