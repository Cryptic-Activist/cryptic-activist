'use client';

import { useState } from 'react';

import { Button } from '@/components';
import { Input, Links } from '@/components/forms';
import { useVerifyAccount } from '@/hooks';
import { Template } from '@/layouts/modals';
import { resetNavigationBar, toggleModal } from '@/store/navigationBar';

import styles from './index.module.scss';

const VerifyAccount = () => {
  const {
    onSubmitFindUser,
    onSubmitVerifyPrivateKeys,
    usernameRegister,
    privateKeysRegister,
    handleSubmitUsername,
    handleSubmitPrivateKeys,

    step,
    usernameErrors,
    privateKeysErrors,
  } = useVerifyAccount();

  const [privateKeysArray, setPrivateKeysArray] = useState<string[]>(
    Array(12).fill('')
  );
  const links = [
    {
      label: "Don't have an account yet?",
      onClick: () => {
        resetNavigationBar();
        toggleModal('register');
      },
    },
    {
      label: 'Already have an account',
      onClick: () => {
        resetNavigationBar();
        toggleModal('login');
      },
    },
  ];

  return (
    <Template
      width={`${step === 'verification' ? '40rem' : '18rem'}`}
      heading="Verify Account"
    >
      <div className={styles.container}>
        {step === 'username' && (
          <form
            onSubmit={handleSubmitUsername(onSubmitFindUser)}
            className={styles.verifyAccountUsernameForm}
          >
            <Input
              type="text"
              name="username"
              id="username"
              required
              label="Username"
              placeholder="Username"
              register={usernameRegister}
              errorMessage={usernameErrors['username']?.message}
            />

            <Button type="submit" padding="1rem" fullWidth>
              Find User
            </Button>
          </form>
        )}
        {step === 'verification' && (
          <form
            onSubmit={handleSubmitPrivateKeys(onSubmitVerifyPrivateKeys)}
            className={styles.verifyAccountPrivateKeysForm}
          >
            <ul className={styles.verifyAccountList}>
              {privateKeysArray.map((privateKeyInput, index) => {
                const privateKeyNumber = index + 1;

                return (
                  <li key={index}>
                    <Input
                      key={index}
                      label={`${privateKeyNumber}`}
                      register={privateKeysRegister}
                      type="text"
                      name={`privateKey${privateKeyNumber}`}
                      id={`privateKey${privateKeyNumber}`}
                      required
                      // value={}
                      width="9rem"
                      errorMessage={
                        privateKeysErrors[`privateKey${privateKeyNumber}`]
                          ?.message
                      }
                    />
                  </li>
                );
              })}
            </ul>
            <Button type="submit" padding="1rem">
              Verify Account
            </Button>
          </form>
        )}
        {step === 'success' && <p>Private Keys were verified</p>}
        {step !== 'success' && <Links links={links} />}
      </div>
    </Template>
  );
};

export default VerifyAccount;
