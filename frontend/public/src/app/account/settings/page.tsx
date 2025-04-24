'use client';

import React, { FormEvent, useState } from 'react';
import { useNavigationBar, useUser } from '@/hooks';

import { Button } from '@/components';
import styles from './page.module.scss';

const AccountSettings = () => {
  const { toggleModal } = useNavigationBar();
  const { user } = useUser();
  const [languages, setLanguages] = useState(['English']);
  const [newLanguage, setNewLanguage] = useState('');

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit the updated account settings to API
    alert('Your settings have been saved!');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Account Settings</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.section}>
          <h2>Security Settings</h2>
          <h3>Two Factor Authentication</h3>
          {user.id && (
            <>
              {user.twoFactorEnabled ? (
                <Button>Disable 2FA</Button>
              ) : (
                <Button onClick={() => toggleModal('enableTwoFactor')}>
                  Enable 2FA
                </Button>
              )}
            </>
          )}
          {/* <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={enable2FA}
              onChange={(e) => setEnable2FA(e.target.checked)}
            />
            Enable Two-Factor Authentication
          </label> */}
        </section>

        <section className={styles.section}>
          <h2>Languages Spoken</h2>
          <div className={styles.languages}>
            {languages.map((lang, index) => (
              <div key={index} className={styles.languageItem}>
                <span>{lang}</span>
                <button
                  type="button"
                  onClick={() => removeLanguage(lang)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={styles.addLanguage}>
            <input
              type="text"
              placeholder="Add a language..."
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={addLanguage}
              className={styles.addButton}
            >
              Add Language
            </button>
          </div>
        </section>

        {/* Additional Account Settings can be added here */}

        {/* Form Submission */}
        <section className={styles.section}>
          <button type="submit" className={styles.submitButton}>
            Save Changes
          </button>
        </section>
      </form>
    </div>
  );
};

export default AccountSettings;
