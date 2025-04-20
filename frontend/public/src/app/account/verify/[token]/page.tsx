'use client';

import React, { useEffect } from 'react';
import { useRouter, useURL } from '@/hooks';

import { useQuery } from '@tanstack/react-query';
import { validateAccountVerificationToken } from '@/services/verifyAccount';

export default function AccountVerification() {
  const { params } = useURL();
  const { replace } = useRouter();
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
      replace('/?account-verified=0');
      return;
    }
    if (data) {
      replace('/?account-verified=1');
      return;
    }
  }, [failureReason, data]);

  return <div>Verifying your account...</div>;
}
