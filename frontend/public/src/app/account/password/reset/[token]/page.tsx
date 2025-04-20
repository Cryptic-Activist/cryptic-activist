'use client';

import React, { useEffect } from 'react';
import { useResetPassword, useRouter, useURL } from '@/hooks';

import { useQuery } from '@tanstack/react-query';
import { validatePasswordResetToken } from '@/services/resetPassword';

export default function PasswordResetVerify() {
  const { params } = useURL();
  const token = params.token as string;

  const { replace } = useRouter();
  const { resetPassword } = useResetPassword();

  const { failureReason, data } = useQuery({
    queryKey: ['resetPasswordToken', params.token],
    queryFn: async () => {
      if (token) {
        const verified = await validatePasswordResetToken(token);
        console.log({ verified });
        return verified;
      }
    },
    retry: 2,
    enabled: !!token,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (failureReason) {
      replace('/?reset-password=0');
      return;
    }
    if (data?.ok) {
      resetPassword.setResetPassword({
        token,
      });
      replace(`/?reset-password=1`);
      return;
    }
  }, [failureReason, data]);

  return <div>Validating password reset request...</div>;
}
