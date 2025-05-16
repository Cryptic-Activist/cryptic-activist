'use client';

import { OnSubmit, OnSubmit2FA } from './types';
import { login2FAResolver, loginResolver } from './zod';
import { useMutation, useQuery } from '@tanstack/react-query';

import { decodeAccessToken } from '@/services/user';
import useApp from '../useApp';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRootStore } from '@/store';

const useUser = () => {
  const { addToast } = useApp();
  const {
    navigationBar: { toggleModal },
    user,
  } = useRootStore();
  const mutation = useMutation({
    mutationFn: user.login,
    mutationKey: ['login'],
    onSuccess: (data) => {
      if (data?.twoFactorEnabled) {
        toggleModal('login');
        toggleModal('twoFactor');
        return;
      }
      addToast('success', 'Logged in successfully', 5000);
    },
  });

  const mutation2FA = useMutation({
    mutationFn: user.login2FA,
    mutationKey: ['login2FA'],
    onSuccess: (data) => {
      if (data) {
        toggleModal('twoFactor');
        addToast('success', 'Logged in successfully', 5000);
      } else {
        addToast('error', 'Invalid 2FA code', 5000);
      }
    },
  });
  const query = useQuery({
    queryKey: ['login'],
    queryFn: async () => {
      const decoded = await decodeAccessToken();
      user.setUser({ ...decoded });
      return user;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const {
    register: loginFormRegister,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({ resolver: loginResolver });

  const {
    register: login2FAFormRegister,
    handleSubmit: handleSubmit2FA,
    formState: { errors: errors2FA },
  } = useForm({ resolver: login2FAResolver });

  const onSubmit: OnSubmit = async (data) => {
    const { password, usernameOrEmail } = data;
    console.log({ usernameOrEmail });
    const loggedIn = await mutation.mutateAsync({ password, usernameOrEmail });
    return loggedIn;
  };

  const onSubmit2FA: OnSubmit2FA = async (data) => {
    if (user.id) {
      const loggedIn = await mutation2FA.mutateAsync({
        token2FA: data.token2FA,
        userId: user?.id,
      });
      return loggedIn;
    }
  };

  useEffect(() => {
    if (mutation.error || query.error) {
      addToast('error', 'Unable to login', 10000);
      setValue('usernameOrEmail', '');
      setValue('password', '');
    }
  }, [mutation.error, query.error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      toggleModal('login');
    }
  }, [mutation.isSuccess]);

  const isLoggedIn = () => {
    const isLogged = user.names?.firstName !== undefined;
    return isLogged;
  };

  return {
    logout: user.logout,
    isLoggedIn,
    handleSubmit,
    onSubmit,
    onSubmit2FA,
    loginFormRegister,
    login2FAFormRegister,
    handleSubmit2FA,
    errors2FA,
    errors,
    user,
    mutation,
    query,
    formValues: {
      usernameOrEmail: getValues('usernameOrEmail'),
      password: getValues('password'),
    },
  };
};

export default useUser;
