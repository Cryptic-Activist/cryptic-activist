'use client';

import { Altcha, Button } from '@/components';
import { FormEvent, useEffect, useState } from 'react';
import { generate2FA, verify2FA } from '@/services/2fa';
import { useMutation, useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { Input } from '@/components/forms';
import { Template } from '@/layouts/modals';
import styles from './index.module.scss';
import { useUser } from '@/hooks';

const EnableTwoFactorAuthentication = () => {
  const { user } = useUser();

  const [qr, setQr] = useState('');
  const [token, setToken] = useState('');
  const [enabled, setEnabled] = useState(false);

  const handleInput = (value: string) => {
    setToken(value);
  };

  const mutation = useMutation({
    mutationKey: ['verify'],
    mutationFn: verify2FA,
  });

  const queryQR = useQuery({
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
    enabled: !user.twoFactorEnabled,
  });

  useEffect(() => {
    if (queryQR.data) {
      setQr(queryQR.data.qr);
    }
  }, [queryQR.data]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.id) {
      const verified = await mutation.mutateAsync({
        token,
        userId: user.id,
      });

      if (verified && verified.success) {
        setEnabled(true);
        user.setUserValue(
          {
            twoFactorEnabled: true,
          },
          'user/setTwoFactorEnabled'
        );
      } else {
        setEnabled(false);
      }
    }
  };

  return (
    <Template width="20rem" heading="2FA">
      <div className={styles.container}>
        {enabled ? (
          <p>2FA is enabled</p>
        ) : (
          <form onSubmit={onSubmit} className={styles.form}>
            {qr && (
              <Image
                src={qr}
                alt="Scan this QR code"
                width={200}
                height={200}
                className={styles.qr}
              />
            )}
            <Input
              type="text"
              name="code"
              id="code"
              required
              label="2FA Code"
              placeholder="2FA Code"
              onChange={handleInput}
              autoComplete={false}
            />
            <Altcha />

            <Button type="submit" padding="1rem" fullWidth>
              {user.twoFactorEnabled ? 'Verify' : 'Verify & Enable'}
            </Button>
          </form>
        )}
      </div>
    </Template>
  );
};

export default EnableTwoFactorAuthentication;
