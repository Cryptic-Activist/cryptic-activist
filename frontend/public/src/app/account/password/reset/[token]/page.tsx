'use client';

import React, { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useURL } from '@/hooks';
import { validatePasswordResetToken } from '@/services/resetPassword';
import { validateWithAuthToken } from '@/services/user';
import { withAuth } from '@/hoc/withAuth';

function PasswordResetVerify() {
  const { params } = useURL();
  const token = params.token as string;

  const { failureReason, data } = useQuery({
    queryKey: ['resetPasswordToken', params.token],
    queryFn: async () => {
      if (token) {
        const verified = await validatePasswordResetToken(token);
        return verified;
      }
    },
    retry: 2,
    enabled: !!token,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (failureReason) {
      window.location.href = '/?reset-password=0';
      return;
    }
    if (data?.ok) {
      window.location.href = '/?reset-password=1&token=' + token;
      return;
    }
  }, [failureReason, data]);

  return <div>Validating password reset request...</div>;
}

export default withAuth(PasswordResetVerify);
