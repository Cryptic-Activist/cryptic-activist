'use client';

import { DisputesFilters, StatusCard, Table } from '@/components';
import { useDisputes, useRouter } from '@/hooks';

import React from 'react';
import styles from './page.module.scss';
import { withAuth } from '@/hoc/withAuth';

const Disputes = () => {
	const {
		onChangePage,
		$disputes,
		disputesColumns,
		totalDisputes,
		openDisputes,
		resolvedToday,
		averageResolution,
		escalatedCases,
		successRate
	} = useDisputes();
	const { push } = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.statsGrid}>
				<StatusCard
					title="Total Disputes"
					iconName="FaTriangleExclamation"
					counter={totalDisputes.data?.total}
					statement={totalDisputes.data?.percentageChange}
				/>
				<StatusCard
					title="Open Disputes"
					iconName="FaFire"
					counter={openDisputes.data?.averageMinutes}
					statement={openDisputes.data?.percentageChange}
				/>
				<StatusCard
					title="Resolved Today"
					iconName="FaCircleCheck"
					counter={resolvedToday.data?.total}
					statement={resolvedToday.data?.percentageChange}
				/>
				<StatusCard
					title="Average Resolution"
					iconName="FaStopwatch"
					counter={averageResolution.data?.total}
					statement={averageResolution.data?.percentageChange}
				/>
				<StatusCard
					title="Escalated Cases"
					iconName="FaArrowUpRightDots"
					counter={escalatedCases.data?.total}
					statement={escalatedCases.data?.percentageChange}
				/>
				<StatusCard
					title="Success Rate"
					iconName="FaBullseye"
					counter={successRate.data?.total}
					statement={successRate.data?.percentageChange}
				/>
			</div>
			<DisputesFilters />
			<Table
				data={$disputes.data}
				columns={disputesColumns}
				titleComponent={
					<div className={styles.disputesContainer}>
						<h2>Disputes</h2>
					</div>
				}
				currentPage={$disputes.currentPage}
				onChangePage={onChangePage}
				totalPages={$disputes.totalPages}
				actionButtons={(row) => {
					const actions = [];

					actions.push({
						label: 'View',
						onClick: () => {
							push(`/dispute/${row.id}`);
						},
						className: 'viewDetails'
					});
					actions.push({
						label: 'Chat',
						onClick: () => console.log('Chatting...'),
						className: 'chat'
					});

					if (row.status === 'INVESTIGATING') {
						actions.push({
							label: 'Resolve',
							onClick: () => console.log('Resolve dispute'),
							className: 'resolve'
						});
					}
					if (row.status === 'ESCALATED') {
						actions.push({
							label: 'Legal Team',
							onClick: () => console.log('Calling legal team'),
							className: 'legalTeam'
						});
					}
					if (row.status === 'PENDING_EVIDENCE') {
						actions.push({
							label: 'Evidence',
							onClick: () => console.log('Evidence'),
							className: 'evidence'
						});
					}

					return actions;
				}}
			/>
		</div>
	);
};

export default withAuth(Disputes, {
	roles: ['SUPER_ADMIN', 'DISPUTE_MANAGER', 'SENIOR_ADMIN']
});
