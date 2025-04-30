'use client';

import { Altcha, Button } from '@/components';
import { Input, Links } from '@/components/forms';

import { Template } from '@/layouts/modals';
import styles from './index.module.scss';
import { useResetPassword } from '@/hooks';
import { useRootStore } from '@/store';

const ResetPasswordRequest = () => {
  const {
    onSubmitResetPasswordRequest,
    handleSubmitResetPasswordRequest,
    passwordResetRequestSent,
    errorsResetPasswordRequest,
    registerResetPasswordRequest,
  } = useResetPassword();
  const {
    navigationBar: { resetNavigationBar, toggleModal },
  } = useRootStore();
  const links = [
    {
      label: "Don't have an account yet?",
      onClick: () => {
        resetNavigationBar();
        toggleModal('register');
      },
    },
    {
      label: 'Already have an account',
      onClick: () => {
        resetNavigationBar();
        toggleModal('login');
      },
    },
  ];

  return (
    <Template
      width="25rem"
      heading="Reset Password"
      name="resetPasswordRequest"
    >
      <div className={styles.container}>
        {passwordResetRequestSent && (
          <div className={styles.success}>
            If the account exists the password reset link has been sent to its
            email address.
          </div>
        )}
        {!passwordResetRequestSent && (
          <form
            onSubmit={handleSubmitResetPasswordRequest(
              onSubmitResetPasswordRequest
            )}
            className={styles.form}
          >
            <Input
              type="text"
              name="unique"
              id="unique"
              required
              label="Username or Email"
              placeholder="Username or Email"
              register={registerResetPasswordRequest}
              errorMessage={errorsResetPasswordRequest['unique']?.message}
            />
            <Altcha />
            <Button type="submit" padding="1rem" fullWidth>
              Reset Password
            </Button>
          </form>
        )}
        {!passwordResetRequestSent && <Links links={links} />}
      </div>
    </Template>
  );
};

export default ResetPasswordRequest;
