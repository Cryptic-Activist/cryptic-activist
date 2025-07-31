'use client';

import { Button, StatusCard } from '@/components';

import React from 'react';
import { Table } from '@/components';
import styles from './page.module.scss';
import { useDashboard } from '@/hooks';
import { validateWithAuthToken } from '@/services/admin';
import { withAuth } from '@/hoc/withAuth';

const Dashboard = () => {
	const {
		recentTrades,
		recentTradesColumns,
		activeOffersQuery,
		completedTradesQuery,
		totalUsersQuery,
		totalVolumeQuery,
		currentPage,
		onChangePage,
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

export default withAuth(Dashboard, {
	roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'MODERATOR', 'FINANCE_MANAGER']
});
