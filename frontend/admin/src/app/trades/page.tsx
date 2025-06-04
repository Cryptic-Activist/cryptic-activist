'use client';

import { Button, StatusCard, Table } from '@/components';

import React from 'react';
import styles from './page.module.scss';
import { useTrades } from '@/hooks';

const Trades = () => {
	const { $trades, onChangePage, handleRowAction, tradesColumns } = useTrades();

	return (
		<div className={styles.container}>
			{/* <div className={styles.statsGrid}>
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
			</div> */}
			<Table
				data={$trades.data}
				columns={tradesColumns}
				onRowAction={handleRowAction}
				titleComponent={
					<div className={styles.recentTradesContainer}>
						<h2>Trades</h2>
					</div>
				}
				currentPage={$trades.currentPage}
				onChangePage={onChangePage}
				totalPages={$trades.totalPages}
			/>
		</div>
	);
};

export default Trades;
