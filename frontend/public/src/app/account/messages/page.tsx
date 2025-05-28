'use client';

import Link from 'next/link';
import Pagination from '@/components/Pagination';
import styles from './page.module.scss';
import { useNotification } from '@/hooks';

const SystemMessages = () => {
  const { notifications, mutation, onChangePage } = useNotification();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>System Notifications</h1>
      <p className={styles.intro}>
        Stay updated with the latest alerts and updates from our platform.
      </p>
      {mutation.isPending && '...'}
      {notifications.data.length === 0 && mutation.isSuccess ? (
        <p className={styles.noMessages}>No new notifications.</p>
      ) : (
        <>
          <div className={styles.notificationList}>
            {notifications.data.map((note) => (
              <Link
                key={note.id}
                className={`${styles.notificationCard} ${
                  note.whenSeen ? styles.read : styles.unread
                }`}
                href={note.url}
              >
                <div className={styles.notificationHeader}>
                  <h2 className={styles.notificationTitle}>System Message</h2>
                  <span className={styles.notificationDate}>
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className={styles.notificationMessage}>{note.message}</p>
              </Link>
            ))}
          </div>
          <Pagination
            currentPage={notifications.currentPage}
            totalPages={notifications.totalPages}
            onPageChange={onChangePage}
          />
        </>
      )}
    </div>
  );
};

export default SystemMessages;
