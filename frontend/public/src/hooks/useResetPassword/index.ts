'use client';

import { OnSubmit, OnSubmitRequest } from './types';
import {
  onSubmitUserResetPassword,
  onSubmitUserResetPasswordRequest,
} from '@/services/resetPassword';
import { resetPasswordRequestResolver, resetPasswordResolver } from './zod';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRootStore } from '@/store';

const useResetPassword = () => {
  const { resetPassword } = useRootStore();

  const [passwordResetRequestSent, setPasswordResetRequestSent] =
    useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const mutationResetPasswordRequest = useMutation({
    mutationKey: ['resetPasswordRequest'],
    mutationFn: onSubmitUserResetPasswordRequest,
    retry: 3,
  });
  const mutationResetPassword = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: onSubmitUserResetPassword,
    retry: 3,
  });
  const {
    register: registerResetPasswordRequest,
    formState: { errors: errorsResetPasswordRequest },
    handleSubmit: handleSubmitResetPasswordRequest,
  } = useForm({ resolver: resetPasswordRequestResolver });
  const {
    register: registerResetPassword,
    formState: { errors: errorsResetPassword },
    handleSubmit: handleSubmitResetPassword,
  } = useForm({ resolver: resetPasswordResolver });

  const onSubmitResetPasswordRequest: OnSubmitRequest = async (data) => {
    const { unique } = data;
    mutationResetPasswordRequest.mutate({
      unique,
    });
  };

  const onSubmitResetPassword: OnSubmit = async (data) => {
    const { passwordConfirm, password } = data;
    if (resetPassword.token) {
      const resetedPasswordResponse = await mutationResetPassword.mutateAsync({
        token: resetPassword?.token,
        password,
        passwordConfirm,
      });

      console.log({ resetedPasswordResponse });

      if (resetedPasswordResponse.ok) {
        resetPassword.resetResetPassword();
        setPasswordResetSuccess(true);
      }
    }
  };

  useEffect(() => {
    if (mutationResetPasswordRequest.data) {
      setPasswordResetRequestSent(true);
    }
  }, [mutationResetPasswordRequest.data]);

  return {
    onSubmitResetPasswordRequest,
    registerResetPasswordRequest,
    handleSubmitResetPasswordRequest,
    errorsResetPasswordRequest,
    passwordResetRequestSent,
    onSubmitResetPassword,
    registerResetPassword,
    handleSubmitResetPassword,
    errorsResetPassword,
    passwordResetSuccess,
    resetPassword,
  };
};

export default useResetPassword;
