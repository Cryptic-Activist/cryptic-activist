'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { OnSubmit } from './types';
import { decodeAccessToken } from '@/services/user';
import { loginResolver } from './zod';
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
  });
  const query = useQuery({
    queryKey: ['login'],
    queryFn: async () => {
      const decoded = await decodeAccessToken();
      user.setUser({ ...decoded });
      return user;
    },
    refetchOnMount: false,
  });
  const {
    register: loginFormRegister,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({ resolver: loginResolver });

  const onSubmit: OnSubmit = (data) => {
    const { password, username } = data;
    mutation.mutate({ password, username });
  };

  useEffect(() => {
    if (mutation.error || query.error) {
      addToast('error', 'Unable to login', 10000);
      setValue('username', '');
      setValue('password', '');
    }
  }, [mutation.error, query.error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      toggleModal('login');
    }
  }, [mutation.isSuccess]);

  const isLoggedIn = () => {
    const isLogged = user.id !== undefined;
    return isLogged;
  };

  return {
    logout: user.logout,
    isLoggedIn,
    handleSubmit,
    onSubmit,
    loginFormRegister,
    errors,
    user: {
      id: user.id,
      names: {
        firstName: user.names?.firstName,
        lastName: user.names?.lastName,
      },
      username: user.username,
      profileColor: user.profileColor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      languages: user.languages,
    },
    mutation,
    query,
    formValues: {
      username: getValues('username'),
      password: getValues('password'),
    },
  };
};

export default useUser;
