'use client';

import { useNotification, useUser } from '@/hooks';

import Link from 'next/link';
import { getNotifications } from '@/services/notifications';
import styles from './page.module.scss';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const SystemMessages = () => {
  const {
    user: { id },
  } = useUser();
  const { notifications } = useNotification();

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (id) {
        const response = await getNotifications(id);
        return response;
      }
    },
    enabled: !!id,
    refetchOnMount: true,
  });

  useEffect(() => {
    notifications.setNotificationValue(
      { notifications: data },
      'notifications/getNotifications'
    );
  }, [data]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>System Notifications</h1>
      <p className={styles.intro}>
        Stay updated with the latest alerts and updates from our platform.
      </p>
      {isPending && '...'}
      {notifications.notifications.length === 0 && isSuccess ? (
        <p className={styles.noMessages}>No new notifications.</p>
      ) : (
        <div className={styles.notificationList}>
          {notifications.notifications.map((note) => (
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
      )}
    </div>
  );
};

export default SystemMessages;
