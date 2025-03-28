import { Button } from '@/components';
import { FC } from 'react';
import type { ProfileNameUsernameProps } from './types';
import styles from './index.module.scss';

const ProfileNameUsername: FC<ProfileNameUsernameProps> = ({
  names,
  username,
}) => {
  const fullname = [names?.firstName ?? '', names?.lastName ?? ''].join(' ');
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h1 className={styles.name}>{fullname}</h1>
        <h2 className={styles.username}>{username}</h2>
      </div>
      <Button href="/offer/create" theme="primary" padding="1em">
        <p>Create Offer</p>
      </Button>
    </div>
  );
};

export default ProfileNameUsername;
