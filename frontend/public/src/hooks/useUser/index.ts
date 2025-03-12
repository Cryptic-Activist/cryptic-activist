'use client';

import { $user, toggleModal } from '@/store';
import { decodeAccessToken, login, logout } from '@/services/user';
import { useMutation, useQuery } from '@tanstack/react-query';

import { OnSubmit } from './types';
import { loginResolver } from './zod';
import useApp from '../useApp';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@nanostores/react';

const useUser = () => {
  const user = useStore($user);
  const { addToast } = useApp();
  const mutation = useMutation({
    mutationFn: login,
    mutationKey: ['login'],
  });
  const query = useQuery({
    queryKey: ['login'],
    queryFn: decodeAccessToken,
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
    return Object.entries(user).length > 0;
  };

  return {
    logout,
    isLoggedIn,
    handleSubmit,
    onSubmit,
    loginFormRegister,
    errors,
    user,
    mutation,
    query,
    formValues: {
      username: getValues('username'),
      password: getValues('password'),
    },
  };
};

export default useUser;
