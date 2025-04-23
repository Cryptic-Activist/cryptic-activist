'use client';

import React, { useEffect, useState } from 'react';
import { generate2FA, verify2FA } from '@/services/2fa';
import { useMutation, useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { useUser } from '@/hooks';

const TwoFactorAuthentication = () => {
  const { user } = useUser();

  const [qr, setQr] = useState('');
  const [token, setToken] = useState('');
  const [enabled, setEnabled] = useState(false);

  const mutation = useMutation({
    mutationKey: ['verify'],
    mutationFn: verify2FA,
  });

  const query = useQuery({
    queryFn: async () => {
      if (user.email && user.id) {
        const qrCode = await generate2FA({
          email: user.email,
          userId: user.id,
        });
        return qrCode;
      }
    },
    queryKey: ['2fa'],
    enabled: !!user.id,
  });

  useEffect(() => {
    if (query.data) {
      setQr(query.data.qr);
    }
  }, [query.data]);

  const verify = async () => {
    const verified = mutation.mutateAsync(token);
    console.log({ verified });
    setEnabled(true);
  };

  if (enabled) return <p>2FA enabled successfully!</p>;
  return (
    <div>
      <Image src={qr} alt="Scan this QR code" width={50} height={50} />
      <br />
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter code from app"
      />
      <br />
      <button onClick={verify}>Verify & Enable</button>
    </div>
  );
};

export default TwoFactorAuthentication;
