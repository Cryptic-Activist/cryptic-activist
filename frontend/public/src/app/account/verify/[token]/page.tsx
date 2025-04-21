'use client';

import React, { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useURL } from '@/hooks';
import { validateAccountVerificationToken } from '@/services/verifyAccount';

export default function AccountVerification() {
  const { params } = useURL();
  const token = params.token as string;
  const { failureReason, data } = useQuery({
    queryKey: ['verifyAccountToken', params.token],
    queryFn: async () => {
      if (token) {
        const verified = await validateAccountVerificationToken(token);
        return verified;
      }
    },
    enabled: !!token,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (failureReason) {
      window.location.href = '/?account-verified=0';
      return;
    }
    if (data) {
      window.location.href = '/?account-verified=1';
      return;
    }
  }, [failureReason, data]);

  return <div>Verifying your account...</div>;
}
