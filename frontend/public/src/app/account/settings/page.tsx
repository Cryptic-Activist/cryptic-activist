'use client';

import { useAccountSettings, useKYC } from '@/hooks';

import { Button } from '@/components';
import { FaPlus } from 'react-icons/fa6';
import { Input } from '@/components/forms';
import React from 'react';
import styles from './page.module.scss';

const AccountSettings = () => {
  const {
    handleChangeEmailRequestSubmit,
    handleNewEmail,
    handleNewLanguage,
    handleSubmit,
    newEmailRequestButtonLabel,
    removeLanguage,
    toggleModal,
    user,
    languages,
    newLanguage,
    newEmail,
    handleDisable2FA,
  } = useAccountSettings();

  const { isKYCPending } = useKYC();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Account Settings</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.subHeading}>Security Settings</h2>
          {user.id && (
            <>
              {user.twoFactorEnabled ? (
                <Button onClick={handleDisable2FA} padding="1rem">
                  Disable 2FA
                </Button>
              ) : (
                <Button
                  onClick={() => toggleModal('enableTwoFactor')}
                  padding="1rem"
                >
                  Enable 2FA
                </Button>
              )}
            </>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>Languages Spoken</h2>
          <form className={styles.addLanguage} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Add a language..."
              value={newLanguage}
              onChange={handleNewLanguage}
            />
            <Button type="submit" padding="1rem">
              Add Language
            </Button>
          </form>
          <ul className={styles.languages}>
            {languages?.map((lang) => {
              const isOnlyElement = languages.length === 1;
              return (
                <li key={lang.id} className={styles.languageItem}>
                  <span>{lang.name}</span>
                  {!isOnlyElement && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang.id)}
                      className={styles.removeButton}
                    >
                      <FaPlus size={12} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>Change Email</h2>
          <form
            className={styles.addLanguage}
            onSubmit={handleChangeEmailRequestSubmit}
          >
            <Input
              type="email"
              placeholder="New Email Address"
              value={newEmail}
              onChange={handleNewEmail}
            />
            <Button type="submit" padding="1rem">
              {newEmailRequestButtonLabel}
            </Button>

            {/* <Altcha /> */}
          </form>
          {user.email && (
            <p>
              <strong>Current email:</strong> {user.email}
            </p>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>KYC</h2>
          {user.id && user.kyc?.length === 0 && (
            <Button href="/account/kyc" size={16} padding="1rem">
              Begin KYC Procedure
            </Button>
          )}
          {isKYCPending && (
            <Button href="/account/kyc" size={16} padding="1rem">
              Check KYC Status
            </Button>
          )}
        </section>

        {/* Additional Account Settings can be added here */}
      </div>
    </div>
  );
};

export default AccountSettings;
