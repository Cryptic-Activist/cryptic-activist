'use client';

import { Altcha, Button } from '@/components';
import { useNavigationBar, useResetPassword } from '@/hooks';

import { Input } from '@/components/forms';
import { Template } from '@/layouts/modals';
import styles from './index.module.scss';

const ResetPassword = () => {
  const {
    errorsResetPassword,
    onSubmitResetPassword,
    handleSubmitResetPassword,
    registerResetPassword,
    passwordResetSuccess,
  } = useResetPassword();
  const { toggleModal, resetNavigationBar } = useNavigationBar();

  const handleToLogin = () => {
    resetNavigationBar();
    toggleModal('login');
  };

  return (
    <Template width="20rem" heading="Reset Password" name="resetPassword">
      <div className={styles.container}>
        {passwordResetSuccess ? (
          <>
            <p>Password was successfully reseted</p>
            <Button type="button" onClick={handleToLogin}>
              To Login
            </Button>
          </>
        ) : (
          <form
            onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}
            className={styles.form}
          >
            <Input
              type="password"
              name="password"
              id="password"
              required
              label="Password"
              placeholder="Password"
              register={registerResetPassword}
              errorMessage={errorsResetPassword['password']?.message}
            />
            <Input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              required
              label="Confirm Password"
              placeholder="Confirm Password"
              register={registerResetPassword}
              errorMessage={errorsResetPassword['passwordConfirm']?.message}
            />
            <Altcha />
            <Button type="submit" padding="1rem" fullWidth>
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </Template>
  );
};

export default ResetPassword;
