'use client';

import { DynamicIcon } from '@/components';
import React from 'react';
import styles from './page.module.scss';
import { useDashboard } from '@/hooks';

const StatusCard = () => {
	return (
		<div className={styles.statusCard}>
			<div className={styles.statusCardHeader}>
				<span>Total Users</span>
				<DynamicIcon iconName="FaUsers" />
			</div>
			<div className={styles.statusCardContent}>
				<span className={styles.value}>1,234</span>
				<span className={`${styles.statement} ${styles.statementGreen}`}>
					+12% from last month
				</span>
			</div>
		</div>
	);
};

const Dashboard = () => {
	const {} = useDashboard();

	return (
		<div className={styles.container}>
			<div className={styles.statsGrid}>
				<StatusCard />
				<StatusCard />
				<StatusCard />
				<StatusCard />
			</div>
		</div>
	);
};

export default Dashboard;
