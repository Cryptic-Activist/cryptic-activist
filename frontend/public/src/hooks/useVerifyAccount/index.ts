'use client';

import { useEffect, useState } from 'react';
import {
  verifyAccountPrivateKeysResolver,
  verifyAccountUsernameResolver,
} from './zod';

import { Step } from './types';
import { useForm } from 'react-hook-form';
import { useRootStore } from '@/store';

const useVerifyAccount = () => {
  const { verifyAccount } = useRootStore();
  const [step, setStep] = useState<Step>('username');
  const {
    register: usernameRegister,
    handleSubmit: handleSubmitUsername,
    formState: { errors: usernameErrors },
  } = useForm({ resolver: verifyAccountUsernameResolver });
  const {
    register: privateKeysRegister,
    handleSubmit: handleSubmitPrivateKeys,
    formState: { errors: privateKeysErrors },
  } = useForm({ resolver: verifyAccountPrivateKeysResolver });

  useEffect(() => {
    verifyAccount.setPrivateKeysArray();
  }, []);

  const onSubmitFindUser = (data: any) => {
    verifyAccount.setUsername({ username: data['username'] });
    setStep('verification');
  };

  const onSubmitVerifyPrivateKeys = async (data: any) => {
    if (verifyAccount.username) {
      const mappedPrivateKeys = Object.values(data).map(
        (privateKey) => privateKey
      ) as string[];
      verifyAccount.setPrivateKeys({ privateKeys: mappedPrivateKeys });

      const isSubmitted = await verifyAccount.verifyPrivateKeys({
        username: verifyAccount.username,
        privateKeys: mappedPrivateKeys,
      });

      if (isSubmitted) {
        setStep('success');
        verifyAccount.setPrivateKeys({ privateKeys: [] });
      }
    }
  };

  return {
    privateKeys: verifyAccount.privateKeys,
    privateKeysArray: verifyAccount.privateKeysArray,
    username: verifyAccount.username,
    isSubmitted: verifyAccount.isSubmitted,
    step,
    usernameErrors,
    privateKeysErrors,
    usernameRegister,
    privateKeysRegister,
    handleSubmitUsername,
    handleSubmitPrivateKeys,
    setUsername: verifyAccount.setUsername,
    onSubmitFindUser,
    onSubmitVerifyPrivateKeys,
  };
};

export default useVerifyAccount;
