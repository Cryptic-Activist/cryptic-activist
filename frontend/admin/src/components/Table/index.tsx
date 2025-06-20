import {
	Cell,
	SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import { DynamicIcon, Pagination } from '@/components';
import React, { useState } from 'react';
import { getFutureDateByHours, getLocaleFullDateString } from '@/utils/date';

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

	const getCellText = (cell: Cell<any, unknown>) => {
		const cellDef = cell.column.columnDef.cell;
		const context = cell.getContext();

		// If cellDef is a function, try to call it with context
		if (typeof cellDef === 'function') {
			const rendered = cellDef(context);

			if (typeof rendered === 'string' || typeof rendered === 'number') {
				return rendered.toString();
			}

			// If the result is JSX, you may not be able to extract plain text safely
			return '';
		}

		// Fallback to cell.getValue() (raw data)
		const value = cell.getValue();
		return typeof value === 'string' || typeof value === 'number'
			? value.toString()
			: '';
	};

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
					{table?.getRowModel()?.rows?.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								const isBadgeColumn =
									cell.column.id === 'status' || cell.column.id === 'type';
								const badgeCellStyle = isBadgeColumn ? styles.statusCell : '';
								const isSlaColumn = cell.column.id === 'slaStatus';
								const isFullDate =
									cell.column.id === 'createdAt' ||
									cell.column.id === 'submittedAt';
								return (
									<td
										key={cell.id}
										title={cell.getValue() as string}
										className={badgeCellStyle}
									>
										{isBadgeColumn && (
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
										)}
										{isSlaColumn && (
											<span>
												{getFutureDateByHours(new Date(getCellText(cell)))}
											</span>
										)}
										{isFullDate && (
											<span>{getLocaleFullDateString(getCellText(cell))}</span>
										)}
										{!isBadgeColumn &&
											!isSlaColumn &&
											!isFullDate &&
											flexRender(cell.column.columnDef.cell, cell.getContext())}
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
