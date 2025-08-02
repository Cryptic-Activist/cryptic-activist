'use client';

import React, { useState } from 'react';
import { withAuth } from '@/hoc/withAuth';
import styles from './page.module.scss';

// Mock data - replace with actual API calls
const mockAdminWallets = [
  { id: '1', address: '0xAdminWallet1...', admin: 'AdminUser1' },
  { id: '2', address: '0xAdminWallet2...', admin: 'AdminUser2' },
];

const mockUserWallets = [
  { id: '1', address: '0xUserWallet1...', user: 'User1' },
  { id: '2', address: '0xUserWallet2...', user: 'User2' },
];

const WalletsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteAdminWallet = (id: string) => {
    // Implement actual delete logic here
    console.log(`Deleting admin wallet with id: ${id}`);
  };

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
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={openModal}>
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
                {mockAdminWallets.map((wallet) => (
                  <tr key={wallet.id}>
                    <td>{wallet.admin}</td>
                    <td className={styles.walletAddress}>{wallet.address}</td>
                    <td className={styles.actions}>
                      <button 
                        className={`${styles.btn} ${styles.btnDanger}`} 
                        onClick={() => handleDeleteAdminWallet(wallet.id)}
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
                {mockUserWallets.map((wallet) => (
                  <tr key={wallet.id}>
                    <td>{wallet.user}</td>
                    <td className={styles.walletAddress}>{wallet.address}</td>
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
              <button className={styles.closeButton} onClick={closeModal}>&times;</button>
            </div>
            <form>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Admin</label>
                <select className={styles.formControl}>
                  <option value="">Select Admin</option>
                  {/* Populate with actual admin users */}
                  <option value="admin1">AdminUser1</option>
                  <option value="admin2">AdminUser2</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Wallet Address</label>
                <input type="text" className={styles.formControl} placeholder="Enter new wallet address" />
              </div>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Create Wallet</button>
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