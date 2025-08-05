'use client';

import {
  getRandomCredentials,
  onSubmitUserRegistration,
} from '@/services/register';
import { useApp, useCountDown } from '..';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { OnSubmit } from './types';
import { registerResolver } from './zod';
import { useForm } from 'react-hook-form';
import { useRootStore } from '@/store';

const useRegister = () => {
  const [successfulRegistration, setSuccessfulRegistration] = useState(false);
  const {
    navigationBar: { resetNavigationBar, toggleModal },
    register,
    app,
  } = useRootStore();
  const { addToast } = useApp();
  const { startCountDown: _startCountDown, timeLeftInSeconds } = useCountDown();
  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: onSubmitUserRegistration,
    retry: 0,
    onError: (err: any) => {
      addToast('error', err.response.data.errors[0], 5000);
    },
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
    watch,
  } = useForm({ resolver: registerResolver });

  const watchedValues = watch();

  const onSubmit: OnSubmit = async (_data) => {
    console.log({ watchedValues });
    mutation.mutateAsync({
      confirmPassword: watchedValues.confirmPassword,
      password: watchedValues.password,
      username: watchedValues.username,
      referralCode: watchedValues.referralCode,
      email: watchedValues.email,
      names: watchedValues.names,
    });
  };

  useEffect(() => {
    if (query.data) {
      setValue('names.firstName', query.data?.names[0]);
      setValue('names.lastName', query.data?.names[1]);
      setValue('username', query.data?.username);
      if (app.referralCode) {
        setValue('referralCode', app.referralCode);
      }
    }
  }, [query.data]);

  useEffect(() => {
    if (mutation.data) {
      register.setRegisterValue(
        {
          firstName: mutation.data.firstName,
          lastName: mutation.data.lastName,
          username: mutation.data.username,
          email: mutation.data.email,
          referralCode: mutation.data.referralCode,
        },
        'register/setRegister'
      );
      register.setPrivateKeys(mutation.data.privateKeys);
      setSuccessfulRegistration(true);
    }
  }, [mutation.data]);

  const toPrivateKeys = () => {
    resetNavigationBar();
    toggleModal('privateKeys');
  };

  return {
    getRandomCredentials,
    registerForm,
    handleSubmit,
    onSubmit,
    toPrivateKeys,
    successfulRegistration,
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
      email: getValues('email'),
      referralCode: getValues('referralCode'),
      password: getValues('password'),
      confirmPassword: getValues('confirmPassword'),
    },
    timeLeftInSeconds,
  };
};

export default useRegister;
