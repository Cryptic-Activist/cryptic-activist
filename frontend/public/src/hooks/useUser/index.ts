'use client';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { decodeAccessToken, login, logout } from '@/services/user';
import { $user, setValue, toggleModal } from '@/store';

import useApp from '../useApp';
import { useForm } from 'react-hook-form';
import { loginResolver } from './zod';
import { OnSubmit } from './types';

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
