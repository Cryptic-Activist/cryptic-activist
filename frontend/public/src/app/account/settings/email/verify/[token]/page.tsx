'use client';

import React, { useEffect } from 'react';

import { updateEmail } from '@/services/user/settings';
import { useQuery } from '@tanstack/react-query';
import { useURL } from '@/hooks';

const AccountSettingsEmailVerify = () => {
  const { params } = useURL();
  const token = params.token as string;
  const { failureReason, data } = useQuery({
    queryKey: ['verifyAccountToken', params.token],
    queryFn: async () => {
      if (token) {
        const verified = await updateEmail(token);
        return verified;
      }
    },
    enabled: !!token,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (failureReason) {
      window.location.href = '/?email-change-verified=0';
      return;
    }
    if (data) {
      window.location.href = '/?email-change-verified=1';
      return;
    }
  }, [failureReason, data]);
  return <div>Verifying email change request...</div>;
};

export default AccountSettingsEmailVerify;
