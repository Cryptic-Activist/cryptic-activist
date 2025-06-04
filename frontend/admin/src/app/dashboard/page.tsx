'use client';

import { Button, StatusCard } from '@/components';
import React, { FC } from 'react';

import { Table } from '@/components';
import styles from './page.module.scss';
import { useDashboard } from '@/hooks';

const Dashboard = () => {
	const {
		recentTrades,
		handleRowAction,
		recentTradesColumns,
		activeOffersQuery,
		completedTradesQuery,
		totalUsersQuery,
		totalVolumeQuery,
		currentPage,
		onChangePage,
		pageSize,
		totalPages
	} = useDashboard();

	return (
		<div className={styles.container}>
			<div className={styles.statsGrid}>
				<StatusCard
					title="Total Users"
					iconName="FaUsers"
					counter={totalUsersQuery.data?.total}
					statement={totalUsersQuery.data?.percentageChange}
				/>
				<StatusCard
					title="Active Offers"
					iconName="FaTags"
					counter={activeOffersQuery.data?.total}
					statement={activeOffersQuery.data?.percentageChange}
				/>
				<StatusCard
					title="Completed Trades"
					iconName="FaHandshakeSimple"
					counter={completedTradesQuery.data?.total}
					statement={completedTradesQuery.data?.percentageChange}
				/>
				<StatusCard
					title="Total Volume"
					iconName="FaChartLine"
					counter={totalVolumeQuery.data?.total}
					statement={totalVolumeQuery.data?.percentageChange}
				/>
			</div>
			<Table
				data={recentTrades}
				columns={recentTradesColumns}
				onRowAction={handleRowAction}
				titleComponent={
					<div className={styles.recentTradesContainer}>
						<h2>Recent Trades</h2>
						<Button href="/trades">All Trades</Button>
					</div>
				}
				currentPage={currentPage}
				onChangePage={onChangePage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default Dashboard;
