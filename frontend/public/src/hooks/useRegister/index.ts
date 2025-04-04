'use client';

import {
  getRandomCredentials,
  onSubmitUserRegistration,
} from '@/services/register';
import { useMutation, useQuery } from '@tanstack/react-query';

import { OnSubmit } from './types';
import { registerResolver } from './zod';
import { useCountDown } from '..';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRootStore } from '@/store';

const useRegister = () => {
  const {
    navigationBar: { resetNavigationBar, toggleModal },
    register,
  } = useRootStore();
  const { startCountDown, timeLeftInSeconds } = useCountDown();
  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: onSubmitUserRegistration,
    retry: 3,
  });
  const query = useQuery({
    queryKey: ['register'],
    queryFn: getRandomCredentials,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  const {
    register: registerForm,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({ resolver: registerResolver });

  const onSubmit: OnSubmit = async (data) => {
    const { confirmPassword, names, password, username } = data;
    mutation.mutate({
      confirmPassword,
      password,
      username,
      names,
    });
  };

  useEffect(() => {
    if (query.data) {
      setValue('names.firstName', query.data?.names[0]);
      setValue('names.lastName', query.data?.names[1]);
      setValue('username', query.data?.username);
    }
  }, [query.data]);

  useEffect(() => {
    if (mutation.data) {
      register.setPrivateKeys(mutation.data.privateKeys);
      const countdownMs = 5000;
      startCountDown(countdownMs);
      setTimeout(() => {
        resetNavigationBar();
        toggleModal('privateKeys');
      }, countdownMs);
    }
  }, [mutation.data]);

  return {
    getRandomCredentials,
    registerForm,
    handleSubmit,
    onSubmit,
    errors,
    query,
    mutation,
    register,
    formValues: {
      names: {
        firstName: getValues('names.firstName'),
        lastName: getValues('names.lastName'),
      },
      username: getValues('username'),
      password: getValues('password'),
      confirmPassword: getValues('confirmPassword'),
    },
    timeLeftInSeconds,
  };
};

export default useRegister;
