'use client';

import React from 'react';
import { FaClone } from 'react-icons/fa';

import { Button } from '@/components';
import { IMPORTANT_ACTIONS } from '@/constants/layouts';
import { usePrivateKeys, useRegister } from '@/hooks';
import { Template } from '@/layouts/modals';

import styles from './index.module.scss';

const PrivateKeys = () => {
  const { register } = useRegister();
  const { handleCopyPrivateKeysToClipboard, onAccountVerification } =
    usePrivateKeys();

  return (
    <Template width="45rem" heading="Private Keys" allowClose={false}>
      <div className={styles.container}>
        <p className={styles.message}>
          The private keys are used for a few important things on the{' '}
          <strong>Cryptic Activist</strong> platform such as:
        </p>
        <section className={styles.importantSection}>
          {IMPORTANT_ACTIONS.map((action, index) => (
            <span className={styles.important} key={index}>
              {action}
            </span>
          ))}
        </section>
        <p>{`Make sure to store these ${register.privateKeys?.length} words private keys somewhere safe. It
            won't be available to retrieve at any time.`}</p>

        <ul className={styles.privateKeysList}>
          {register.privateKeys?.map((privateKey, index) => (
            <span className={styles.important} key={index}>
              {privateKey}
            </span>
          ))}
        </ul>

        <div className={styles.inline}>
          <Button
            align="center"
            type="button"
            theme="secondary"
            onClick={handleCopyPrivateKeysToClipboard}
          >
            <span>Copy</span>
            <FaClone size="1.2rem" />
          </Button>
          <Button
            align="center"
            type="button"
            theme="primary"
            onClick={onAccountVerification}
          >
            Verify Account
          </Button>
        </div>
      </div>
    </Template>
  );
};

export default PrivateKeys;
