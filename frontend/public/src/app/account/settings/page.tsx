'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import {
  addSpokenLanguage,
  removeSpokenLanguage,
} from '@/services/user/settings';
import { useApp, useNavigationBar, useUser } from '@/hooks';

import { Button } from '@/components';
import { FaPlus } from 'react-icons/fa6';
import { Input } from '@/components/forms';
import styles from './page.module.scss';

const AccountSettings = () => {
  const { toggleModal } = useNavigationBar();
  const { addToast } = useApp();
  const { user } = useUser();
  const [languages, setLanguages] = useState(user.languages);
  const [newLanguage, setNewLanguage] = useState('');

  const addLanguage = (newLang: { id: string; name: string }) => {
    const filtered = languages?.filter((lang) =>
      lang.name.toLowerCase().trim().includes(newLanguage.toLowerCase().trim())
    );
    if (filtered?.length === 0) {
      setLanguages((prev) => [
        ...(prev || []),
        {
          name: newLang.name,
          id: newLang.id,
        },
      ]);
    }
  };

  const removeLanguage = async (languageId: string) => {
    if (user.id) {
      const removedLang = await removeSpokenLanguage({
        languageId,
        userId: user.id,
      });

      if (removedLang.ok) {
        setLanguages((prevLangs) => {
          const filtered = prevLangs?.filter(
            (prevLang) => languageId !== prevLang.id
          );
          return filtered;
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.id) {
      const addedLanguage = await addSpokenLanguage({
        language: newLanguage,
        userId: user.id,
      });

      if (addedLanguage.errors) {
        addToast('error', addedLanguage.errors[0], 5000);
        return;
      }

      if (addedLanguage) {
        addLanguage({ id: addedLanguage.languageId, name: newLanguage });
        setNewLanguage('');
      }
    }
  };

  const handleNewLanguage = (value: string) => {
    setNewLanguage(value);
  };

  useEffect(() => {
    setLanguages(user.languages);
  }, [user.languages]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Account Settings</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.subHeading}>Security Settings</h2>
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

        {/* Additional Account Settings can be added here */}
      </div>
    </div>
  );
};

export default AccountSettings;
