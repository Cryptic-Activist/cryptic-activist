'use client';

import { DynamicIcon } from '@/components';
import Link from 'next/link';
import styles from './banners.module.scss';
import { useBanner } from '@/hooks/useBanner';
import { withAuth } from '@/hoc/withAuth';

const BannersPage = () => {
	const { banners, deleteBanner } = useBanner();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.pageTitle}>Banners</h1>
				<Link href="/banners/create" className={styles.link}>
					<button className={`${styles.btn} ${styles.btnPrimary}`}>
						Create Banner
					</button>
				</Link>
			</div>
			<div className={styles.mainContent}>
				<div className={styles.leftColumn}>
					<div className={styles.card}>
						<div className={styles.cardHeader}>All Banners</div>
						<div className={styles.cardContent}>
							<table className={styles.table}>
								<thead>
									<tr>
										<th>Target Website</th>
										<th>Pages</th>
										<th>Type</th>
										<th>Start Date</th>
										<th>End Date</th>
										<th>Is Active</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{banners?.map((banner: any) => (
										<tr key={banner.id}>
											<td>{banner.targetWebsite}</td>
											<td>{banner.pages.join(', ')}</td>
											<td>{banner.type}</td>
											<td>{new Date(banner.startDate).toLocaleString()}</td>
											<td>
												{banner.endDate
													? new Date(banner.endDate).toLocaleString()
													: '-'}
											</td>
											<td>{banner.isActive ? 'Yes' : 'No'}</td>
											<td className={styles.btns}>
												<Link href={`/banners/edit/${banner.id}`}>
													<button
														className={`${styles.btn} ${styles.btnSecondary}`}
													>
														<DynamicIcon iconName="FaPen" size={16} />
													</button>
												</Link>
												<button
													onClick={() => deleteBanner(banner.id)}
													className={`${styles.btn} ${styles.btnDanger}`}
												>
													<DynamicIcon iconName="FaTrash" size={16} />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withAuth(BannersPage, {
	roles: ['SUPER_ADMIN', 'SENIOR_ADMIN']
});
