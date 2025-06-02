'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  addSpokenLanguage,
  disable2FA,
  removeSpokenLanguage,
  updateEmailRequest,
} from '@/services/user/settings';

import useApp from '../useApp';
import { useMutation } from '@tanstack/react-query';
import useNavigationBar from '../useNavigationBar';
import useUser from '../useUser';

const useAccountSettings = () => {
  const { toggleModal } = useNavigationBar();
  const { addToast } = useApp();
  const { user } = useUser();
  const [languages, setLanguages] = useState(user.languages);
  const [newLanguage, setNewLanguage] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEmailRequestButtonLabel, setNewEmailRequestButtonLabel] =
    useState('Update Email');

  const mutationDisable2FA = useMutation({
    mutationKey: ['disable2FA'],
    mutationFn: async () => {
      if (user?.id) {
        const response = await disable2FA(user.id);
        return response;
      }
    },
    onSuccess: (data) => {
      if (data.ok) {
        user.setUserValue({ twoFactorEnabled: false }, 'user/disableTwoFactor');
      }
    },
  });

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

  const handleChangeEmailRequestSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (user.id) {
      const requested = await updateEmailRequest({
        userId: user.id,
        email: newEmail,
      });

      if (!requested) {
        addToast('error', 'Unable to send email change request.', 5000);
        return;
      }

      setNewEmail('');
      setNewEmailRequestButtonLabel('Request Sent');
      addToast(
        'info',
        'Email change request sent to your current email.',
        5000
      );
      setTimeout(() => {
        setNewEmailRequestButtonLabel('Update Email');
      }, 5000);
    }
  };

  const handleNewLanguage = (value: string) => {
    setNewLanguage(value);
  };

  const handleNewEmail = (value: string) => {
    setNewEmail(value);
  };

  const handleDisable2FA = async () => {
    mutationDisable2FA.mutate();
  };

  useEffect(() => {
    setLanguages(user.languages);
  }, [user.languages]);
  return {
    toggleModal,
    newEmailRequestButtonLabel,
    removeLanguage,
    handleChangeEmailRequestSubmit,
    handleSubmit,
    handleNewLanguage,
    handleNewEmail,
    handleDisable2FA,
    user,
    languages,
    newEmail,
    newLanguage,
  };
};

export default useAccountSettings;
