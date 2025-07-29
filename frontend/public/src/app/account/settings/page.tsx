'use client';

import { useAccountSettings, useKYC } from '@/hooks';

import { Button } from '@/components';
import { FaPlus } from 'react-icons/fa6';
import { Input } from '@/components/forms';
import React from 'react';
import styles from './page.module.scss';
import { validateWithAuthToken } from '@/services/user';
import { withAuth } from '@/hoc/withAuth';

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
          <p>
            Adds a quick second check to keep your P2P crypto trades secure.
          </p>
          {user.id && (
            <>
              {user.twoFactorEnabled ? (
                <Button
                  onClick={handleDisable2FA}
                  padding="1rem"
                  fullWidth
                  theme="gradient"
                >
                  Disable 2FA
                </Button>
              ) : (
                <Button
                  onClick={() => toggleModal('enableTwoFactor')}
                  padding="1rem"
                  fullWidth
                  theme="gradient"
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
              width="100%"
              name="language"
              id="language"
              style={styles.emailInput}
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
              name="newEmail"
              id="newEmail"
              width="100%"
              style={styles.emailInput}
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
          <p>
            A simple step to verify your identity with ID documents, ensuring
            safe and trusted trading.
          </p>
          {user.id && user.kyc?.length === 0 && (
            <Button
              href="/account/kyc"
              size={16}
              padding="1rem"
              theme="gradient"
              fullWidth
            >
              Begin KYC Procedure
            </Button>
          )}
          {isKYCPending && (
            <Button
              href="/account/kyc"
              size={16}
              padding="1rem"
              theme="gradient"
              fullWidth
            >
              Check KYC Status
            </Button>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>Premium Account</h2>
          <p>
            Subscribe to a Premium acount now and reduce the amount of fees you
            can on each trade.
          </p>

          <Button
            href="/account/premium"
            size={16}
            padding="1rem"
            theme="gradient"
            fullWidth
          >
            <>
              {user.id &&
                (!user.premiumPurchase ||
                  (user.premiumPurchase &&
                    user.premiumPurchase.length === 0)) &&
                'Subscribe to Premium'}
              {user.id &&
                user.premiumPurchase &&
                user.premiumPurchase.length > 0 &&
                'Change or Cancel your Premium account'}
            </>
          </Button>
        </section>

        {/* Additional Account Settings can be added here */}
      </div>
    </div>
  );
};

export default withAuth(AccountSettings);
