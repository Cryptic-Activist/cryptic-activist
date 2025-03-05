'use client';

import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  getRandomCredentials,
  onSubmitUserRegistration,
} from '@/services/register';
import { resetNavigationBar, toggleModal } from '@/store/navigationBar';

import { registerResolver } from './zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { $register, setRegisterPrivateKeys } from '@/store';
import { useStore } from '@nanostores/react';
import { useCountDown } from '..';
import { OnSubmit, OnSubmitPayload } from './types';

const useRegister = () => {
  const register = useStore($register);
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
    gcTime: 0,
    staleTime: 0,
  });
  const {
    register: registerForm,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({ resolver: registerResolver });

  const onSubmit: OnSubmit = async (data) => {
    setValue('successMessage', undefined);

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
      setRegisterPrivateKeys(mutation.data.privateKeys);
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
      successMessage: getValues('successMessage'),
    },
    timeLeftInSeconds,
  };
};

export default useRegister;
