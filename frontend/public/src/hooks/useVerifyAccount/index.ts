'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  $verifyAccount,
  setPrivateKeys,
  setPrivateKeysArray,
  setUsername,
  submitVerifyPrivateKeys,
} from '@/store';
import { useStore } from '@nanostores/react';

import { Step } from './types';
import {
  verifyAccountPrivateKeysResolver,
  verifyAccountUsernameResolver,
} from './zod';

const useVerifyAccount = () => {
  const [step, setStep] = useState<Step>('username');

  const { privateKeys, privateKeysArray, username, isSubmitted } =
    useStore($verifyAccount);

  const {
    register: usernameRegister,
    handleSubmit: handleSubmitUsername,
    formState: { errors: usernameErrors },
  } = useForm({ resolver: verifyAccountUsernameResolver });
  const {
    register: privateKeysRegister,
    handleSubmit: handleSubmitPrivateKeys,
    formState: { errors: privateKeysErrors },
    getValues,
  } = useForm({ resolver: verifyAccountPrivateKeysResolver });

  useEffect(() => {
    setPrivateKeysArray();
  }, []);

  const onSubmitFindUser = (data: any) => {
    setUsername({ username: data['username'] });
    setStep('verification');
  };

  const onSubmitVerifyPrivateKeys = async (data: any) => {
    const mappedPrivateKeys = Object.values(data).map(
      (privateKey) => privateKey
    ) as string[];
    setPrivateKeys({ privateKeys: mappedPrivateKeys });

    const isSubmitted = await submitVerifyPrivateKeys({
      username,
      privateKeys: mappedPrivateKeys,
    });

    if (isSubmitted) {
      setStep('success');
      setPrivateKeys({ privateKeys: [] });
    }
  };

  return {
    privateKeys,
    privateKeysArray,
    username,
    isSubmitted,
    step,
    usernameErrors,
    privateKeysErrors,
    usernameRegister,
    privateKeysRegister,
    handleSubmitUsername,
    handleSubmitPrivateKeys,
    setUsername,
    onSubmitFindUser,
    onSubmitVerifyPrivateKeys,
  };
};

export default useVerifyAccount;
