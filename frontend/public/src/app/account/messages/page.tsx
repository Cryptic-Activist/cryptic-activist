'use client';

import { DynamicIcon } from '@/components';
import { FC } from 'react';
import Link from 'next/link';
import { MessageProps } from './types';
import Pagination from '@/components/Pagination';
import { icons } from './data';
import styles from './page.module.scss';
import { timeSince } from '@/utils';
import { useNotification } from '@/hooks';

const Message: FC<MessageProps> = ({ note }) => {
  const getNotification = () => {
    const filtered = icons.filter((icon) => icon.type === note.type);
    return filtered.length > 0 ? filtered[0] : null;
  };
  const notification = getNotification();

  const getActionButtons = () => {
    return (
      <>
        <Link
          href={note.url}
          style={{
            backgroundColor: notification?.backgroundColor,
            color: notification?.color,
          }}
        >
          Go to Trade
        </Link>
        <button>Mark as Read</button>
      </>
    );
  };

  return (
    <li
      key={note.id}
      className={`${styles.notificationCard} ${
        note.whenSeen ? styles.read : styles.unread
      }`}
      style={{
        borderLeftColor: notification?.backgroundColor,
      }}
    >
      <div className={styles.notificationCardHeader}>
        <div
          className={styles.notificationIcon}
          style={{ backgroundColor: notification?.backgroundColor }}
        >
          <DynamicIcon
            iconName={notification ? notification.name : ''}
            color={notification?.color}
          />
        </div>
        <div className={styles.notificationTitleDescription}>
          <h3>{notification?.title}</h3>
          <p>{note.message}</p>
        </div>
      </div>
      <span className={styles.timeAgo}>{`${timeSince(note.createdAt)}`}</span>
      <div className={styles.actionBtns}>{getActionButtons()}</div>
    </li>
  );
};

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
        <div className={styles.notificationListContainer}>
          <ul className={styles.notificationList}>
            {notifications.data.map((note) => (
              <Message key={note.id} note={note} />
              // <Link
              //   key={note.id}
              //   className={`${styles.notificationCard} ${
              //     note.whenSeen ? styles.read : styles.unread
              //   }`}
              //   href={note.url}
              // >
              //   <div className={styles.notificationHeader}>
              //     <h2 className={styles.notificationTitle}>System Message</h2>
              //     <span className={styles.notificationDate}>
              //       {new Date(note.createdAt).toLocaleString()}
              //     </span>
              //   </div>
              //   <p className={styles.notificationMessage}>{note.message}</p>
              // </Link>
            ))}
          </ul>
          <Pagination
            currentPage={notifications.currentPage}
            totalPages={notifications.totalPages}
            onPageChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default SystemMessages;
