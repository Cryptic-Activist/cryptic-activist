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
      // @ts-ignore
      replace(failureReason?.response.data.redirectUrl);
      return;
    }
    if (data) {
      replace(data?.redirectUrl);
      return;
    }
  }, [failureReason, data]);

  return <div>Verifying your account...</div>;
}
