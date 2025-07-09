'use client';

import { ActionCard, Button, StatusCard } from '@/components';

import React from 'react';
import { Table } from '@/components';
import styles from './page.module.scss';
import { useDashboard } from '@/hooks';

const SmartContracts = () => {
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
			<div className={styles.grids}>
				<div className={styles.statsGrid}>
					<StatusCard
						title="Total Contracts"
						iconName="FaFileContract"
						counter={totalUsersQuery.data?.total}
						statement={totalUsersQuery.data?.percentageChange}
					/>
					<StatusCard
						title="Active Contracts"
						iconName="FaBolt"
						counter={activeOffersQuery.data?.total}
						statement={activeOffersQuery.data?.percentageChange}
					/>
					<StatusCard
						title="Gas Used Today"
						iconName="FaFire"
						counter={completedTradesQuery.data?.total}
						statement={completedTradesQuery.data?.percentageChange}
					/>
					<StatusCard
						title="Transactions"
						iconName="FaRightLeft"
						counter={totalVolumeQuery.data?.total}
						statement={totalVolumeQuery.data?.percentageChange}
					/>
					<StatusCard
						title="Avg. Gas Price"
						iconName="FaGasPump"
						counter={totalVolumeQuery.data?.total}
						statement={totalVolumeQuery.data?.percentageChange}
					/>
				</div>
				<div className={styles.actionsGrid}>
					<ActionCard
						title="Deploy Contract"
						iconName="FaRocket"
						actionButton="Deploy Now"
						href="/smart-contracts/deploy"
					/>
					<ActionCard
						title="Verify Contract"
						iconName="FaCheck"
						actionButton="Verify"
						href="/smart-contracts/verify"
					/>
					<ActionCard
						title="Monitor Performance"
						iconName="FaChartLine"
						actionButton="Monitor"
						href="/smart-contract/monitor"
					/>
				</div>
			</div>
			<Table
				data={recentTrades}
				columns={recentTradesColumns}
				titleComponent={
					<div className={styles.recentTradesContainer}>
						<h2>Deployed Smart Contracts</h2>
					</div>
				}
				currentPage={currentPage}
				onChangePage={onChangePage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default SmartContracts;
