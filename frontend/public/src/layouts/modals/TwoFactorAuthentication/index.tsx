'use client';

import { Button } from '@/components';
import { Input } from '@/components/forms';
import { Template } from '@/layouts/modals';
import styles from './index.module.scss';
import { useUser } from '@/hooks';

const TwoFactorAuthentication = () => {
  const { errors2FA, login2FAFormRegister, onSubmit2FA, handleSubmit2FA } =
    useUser();

  return (
    <Template width="20rem" heading="2FA">
      <div className={styles.container}>
        <form onSubmit={handleSubmit2FA(onSubmit2FA)} className={styles.form}>
          <Input
            type="text"
            name="token2FA"
            id="token2FA"
            required
            label="2FA Code"
            placeholder="2FA Code"
            register={login2FAFormRegister}
            errorMessage={errors2FA['token2FA']?.message}
            autoComplete={false}
            autoFocus
          />

          <Button type="submit" padding="1rem" fullWidth>
            Send Code
          </Button>
        </form>
      </div>
    </Template>
  );
};

export default TwoFactorAuthentication;
