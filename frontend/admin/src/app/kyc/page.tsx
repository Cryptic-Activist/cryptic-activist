'use client';

import { DisputesFilters, KYCsFilters, StatusCard, Table } from '@/components';
import { useDisputes, useKYCs, useRouter } from '@/hooks';

import React from 'react';
import styles from './page.module.scss';
import { withAuthAdvanced } from '@/hoc/withAuth';

const KYCsPage = () => {
	const {
		onChangePage,
		$kycs,
		totalApprovedKYC,
		totalKYCApplications,
		totalPendingKYC,
		totalRejectedKYC,
		kycsColumns
	} = useKYCs();
	const { push } = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.statsGrid}>
				<StatusCard
					title="Pending Review"
					iconName="FaClock"
					counter={totalPendingKYC.data?.total}
					statement={totalPendingKYC.data?.percentageChange}
				/>
				<StatusCard
					title="Approved"
					iconName="FaCircleCheck"
					counter={totalApprovedKYC.data?.total}
					statement={totalApprovedKYC.data?.percentageChange}
				/>
				<StatusCard
					title="Rejected"
					iconName="FaCircleXmark"
					counter={totalRejectedKYC.data?.total}
					statement={totalRejectedKYC.data?.percentageChange}
				/>
				<StatusCard
					title="Total Applications"
					iconName="FaFileLines"
					counter={totalKYCApplications.data?.total}
					statement={totalKYCApplications.data?.percentageChange}
				/>
			</div>
			<KYCsFilters />
			<Table
				data={$kycs.data}
				columns={kycsColumns}
				titleComponent={
					<div className={styles.kycsContainer}>
						<h2>KYC Applications</h2>
					</div>
				}
				currentPage={$kycs.currentPage}
				onChangePage={onChangePage}
				totalPages={$kycs.totalPages}
				actionButtons={(row) => {
					const actions = [];

					actions.push({
						label: 'View',
						onClick: () => {
							push(`/kyc/${row.id}`);
						},
						className: 'viewDetails'
					});

					return actions;
				}}
			/>
		</div>
	);
};

export default withAuth(KYCsPage);
	roles: ['KYC_REVIEWER', 'SUPER_ADMIN', 'SENIOR_ADMIN']
});
