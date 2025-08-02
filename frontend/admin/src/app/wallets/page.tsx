'use client';

import React, { useState } from 'react';

import styles from './page.module.scss';
import { useWallet } from '@/hooks/useWallet/useWallet';
import { withAuth } from '@/hoc/withAuth';

const WalletsPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {
		userWallets,
		adminWallets,
		softDeleteAdminWalletMutation,
		superAdmins,
		createAdminWalletMutation
	} = useWallet();

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.pageTitle}>Wallets Management</h1>
			</div>

			<div className={styles.mainContent}>
				{/* Admin Wallets Card */}
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h2>Admin Wallets</h2>
						<button
							className={`${styles.btn} ${styles.btnPrimary}`}
							onClick={openModal}
						>
							Create New Wallet
						</button>
					</div>
					<div className={styles.cardContent}>
						<table className={styles.walletTable}>
							<thead>
								<tr>
									<th>Admin</th>
									<th>Address</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{adminWallets?.map((wallet: any) => (
									<tr key={wallet.id}>
										<td>{wallet.admin.username}</td>
										<td className={styles.walletAddress}>
											{wallet.wallet.address}
										</td>
										<td className={styles.actions}>
											<button
												className={`${styles.btn} ${styles.btnDanger}`}
												onClick={() =>
													softDeleteAdminWalletMutation.mutate(wallet.id)
												}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* User Wallets Card */}
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h2>User Wallets</h2>
					</div>
					<div className={styles.cardContent}>
						<table className={styles.walletTable}>
							<thead>
								<tr>
									<th>User</th>
									<th>Address</th>
								</tr>
							</thead>
							<tbody>
								{userWallets?.map((wallet: any) => (
									<tr key={wallet.id}>
										<td>{wallet.user.username}</td>
										<td className={styles.walletAddress}>
											{wallet.wallet.address}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{isModalOpen && (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h2 className={styles.modalTitle}>Create New Admin Wallet</h2>
							<button className={styles.closeButton} onClick={closeModal}>
								&times;
							</button>
						</div>
						<form>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Admin</label>
								<select className={styles.formControl}>
									<option value="">Select Admin</option>
									{superAdmins?.map((superAdmin: any) => (
										<option value={superAdmin.id} key={superAdmin.id}>
											{superAdmin.username}
										</option>
									))}
								</select>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Wallet Address</label>
								<input
									type="text"
									className={styles.formControl}
									placeholder="Enter new wallet address"
								/>
							</div>
							<button
								type="submit"
								className={`${styles.btn} ${styles.btnPrimary}`}
							>
								Create Wallet
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default withAuth(WalletsPage, {
	roles: ['SUPER_ADMIN']
});
