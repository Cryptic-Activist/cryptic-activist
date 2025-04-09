'use client';

import styles from './page.module.scss';
import { useState } from 'react';

const dummyNotifications = [
  {
    id: 1,
    title: 'Account Verified',
    message:
      'Your KYC verification is complete. Enjoy increased trading limits!',
    date: '2025-04-01T10:15:00Z',
    read: false,
  },
  {
    id: 2,
    title: 'New Trading Feature',
    message:
      'Explore our new feature designed to enhance your trading experience.',
    date: '2025-03-28T14:35:00Z',
    read: true,
  },
  {
    id: 3,
    title: 'Scheduled Maintenance',
    message:
      'Our system will be under maintenance on 2025-04-05 from 02:00 AM to 04:00 AM UTC. Please plan accordingly.',
    date: '2025-03-30T08:00:00Z',
    read: false,
  },
];

const SystemMessages = () => {
  const [notifications, _setNotifications] = useState(dummyNotifications);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>System Notifications</h1>
      <p className={styles.intro}>
        Stay updated with the latest alerts and updates from our platform.
      </p>
      {notifications.length === 0 ? (
        <p className={styles.noMessages}>No new notifications.</p>
      ) : (
        <div className={styles.notificationList}>
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`${styles.notificationCard} ${
                note.read ? styles.read : styles.unread
              }`}
            >
              <div className={styles.notificationHeader}>
                <h2 className={styles.notificationTitle}>{note.title}</h2>
                <span className={styles.notificationDate}>
                  {new Date(note.date).toLocaleString()}
                </span>
              </div>
              <p className={styles.notificationMessage}>{note.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemMessages;
