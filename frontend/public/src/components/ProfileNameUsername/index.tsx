import { Button } from '@/components';
import { FC } from 'react';
import { FaGear } from 'react-icons/fa6';
import type { ProfileNameUsernameProps } from './types';
import styles from './index.module.scss';

const ProfileNameUsername: FC<ProfileNameUsernameProps> = ({
  names,
  username,
  isUser,
}) => {
  const fullname = [names?.firstName ?? '', names?.lastName ?? ''].join(' ');
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h1 className={styles.name}>{fullname}</h1>
        <h2 className={styles.username}>{username}</h2>
      </div>
      {isUser && (
        <div className={styles.btns}>
          <Button href="/account/settings" theme="primary" padding="1em">
            <FaGear size={20} />
          </Button>
          <Button href="/offer/create" theme="primary" padding="1em">
            <p>Create Offer</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileNameUsername;
