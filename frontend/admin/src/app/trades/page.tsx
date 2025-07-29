'use client';

import { Button, StatusCard, Table, TradesFilters } from '@/components';

import React from 'react';
import styles from './page.module.scss';
import { useTrades } from '@/hooks';
import { withAuthAdvanced } from '@/hoc/withAuth';

const Trades = () => {
	const {
		onChangePage,
		$trades,
		tradesColumns,
		totalTrades,
		activeTrades,
		completedTradesToday,
		disputedTrades,
		tradeVolume,
		averageCompletion
	} = useTrades();

	return (
		<div className={styles.container}>
			<div className={styles.statsGrid}>
				<StatusCard
					title="Total Trades"
					iconName="FaHandshakeSimple"
					counter={totalTrades.data?.total}
					statement={totalTrades.data?.percentageChange}
				/>
				<StatusCard
					title="Active Trades"
					iconName="FaSpinner"
					counter={activeTrades.data?.total}
					statement={activeTrades.data?.percentageChange}
				/>
				<StatusCard
					title="Completed Today"
					iconName="FaCalendarCheck"
					counter={completedTradesToday.data?.total}
					statement={completedTradesToday.data?.percentageChange}
				/>
				<StatusCard
					title="Disputed Trades"
					iconName="FaTriangleExclamation"
					counter={disputedTrades.data?.total}
					statement={disputedTrades.data?.percentageChange}
				/>
				<StatusCard
					title="Trade Voulme"
					iconName="FaChartLine"
					counter={tradeVolume.data?.total}
					statement={tradeVolume.data?.percentageChange}
				/>
				<StatusCard
					title="Average Completion"
					iconName="FaClock"
					counter={averageCompletion.data?.averageMinutes}
					statement={averageCompletion.data?.percentageChange}
				/>
			</div>
			<TradesFilters />
			<Table
				data={$trades.data}
				columns={tradesColumns}
				titleComponent={
					<div className={styles.tradesContainer}>
						<h2>Trades</h2>
					</div>
				}
				currentPage={$trades.currentPage}
				onChangePage={onChangePage}
				totalPages={$trades.totalPages}
				actionButtons={(row) => {
					const actions = [];

					if (row.status === 'EXPIRED' || row.status === 'COMPLETED') {
						actions.push({
							label: 'View Details',
							onClick: () => console.log('Viewing trade details...'),
							className: 'viewDetails'
						});
					}
					if (row.status === 'IN_PROGRESS') {
						actions.push({
							label: 'View',
							onClick: () => console.log('Viewing ongoing trade...'),
							className: 'viewOngoing'
						});
						actions.push({
							label: 'Dispute',
							onClick: () => console.log('Opening a dispute'),
							className: 'dispute'
						});
					}
					if (row.status === 'PENDING' || row.status === 'IN_PROGRESS') {
						actions.push({
							label: 'Cancel',
							onClick: () => console.log('Cancelling trade...'),
							className: 'cancel'
						});
					}

					return actions;
				}}
			/>
		</div>
	);
};

export default withAuth(Trades);
	roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'DISPUTE_MANAGER']
});
