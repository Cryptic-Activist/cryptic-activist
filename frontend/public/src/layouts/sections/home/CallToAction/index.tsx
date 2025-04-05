'use client';

import { Button } from '@/components';
import styles from './index.module.scss';
import { useNavigationBar } from '@/hooks';

const CallToAction = () => {
  const { toggleModal } = useNavigationBar();
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Ready to Start Trading?</h2>
      <p className={styles.subheading}>
        Join a growing community of trusted users and take control of your
        crypto.
      </p>

      <div className={styles.buttons}>
        <Button padding="0.8rem" onClick={() => toggleModal('register')}>
          Create Account
        </Button>
        <Button padding="0.8rem" href="/vendors" theme="secondary">
          Explore Marketplace
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
