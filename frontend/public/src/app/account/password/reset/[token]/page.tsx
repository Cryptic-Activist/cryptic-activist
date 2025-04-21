'use client';

import React, { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useURL } from '@/hooks';
import { validatePasswordResetToken } from '@/services/resetPassword';

export default function PasswordResetVerify() {
  const { params } = useURL();
  const token = params.token as string;

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
      window.location.href = '/?reset-password=1';
      return;
    }
    if (data?.ok) {
      window.location.href = '/?reset-password=1&token=' + token;
      return;
    }
  }, [failureReason, data]);

  return <div>Validating password reset request...</div>;
}
