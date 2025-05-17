'use client';

import { Altcha, Button } from '@/components';
import { Input, Links } from '@/components/forms';

import { APP_NAME } from '@/constants';
import { Template } from '@/layouts/modals';
import styles from './index.module.scss';
import { useRegister } from '@/hooks';
import { useRootStore } from '@/store';

const Register = () => {
  const {
    registerForm,
    handleSubmit,
    formValues,
    onSubmit,
    toPrivateKeys,
    register,
    errors,
    mutation,
    query,
    timeLeftInSeconds: _timeLeftInSeconds,
    successfulRegistration,
  } = useRegister();
  const {
    navigationBar: { resetNavigationBar, toggleModal },
  } = useRootStore();

  const links = [
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
      width={successfulRegistration ? '30rem' : '20rem'}
      heading={
        successfulRegistration ? 'Registration Confirmation' : 'Register'
      }
      allowClose={!successfulRegistration}
    >
      <div className={styles.container}>
        {successfulRegistration ? (
          <div className={styles.registrationConfirmation}>
            <div className={styles.registrationConfirmationContent}>
              <p>
                Welcome to {APP_NAME},{' '}
                <strong>
                  {register.firstName} {register.lastName}
                </strong>
                .
              </p>
              <p>
                You have successfully registered your account. Please check your
                email for the verification link.
              </p>
              <p>
                If you haven&apos;t received the email, please check your spam
                folder.
              </p>
              <p>
                If you have any questions, please contact us at{' '}
                <a href={`mailto:${APP_NAME}`} className={styles.email}>
                  {APP_NAME}
                </a>
                .
              </p>
              <p>Thank you for choosing {APP_NAME}!</p>
            </div>
            <Button
              type="button"
              padding="1rem"
              fullWidth
              onClick={toPrivateKeys}
            >
              To your private keys
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              type="text"
              name="names.firstName"
              id="names.firstName"
              required
              disabled
              label="First Name"
              placeholder={query.isPending ? '...' : 'First Name'}
              register={registerForm}
              value={formValues.names.firstName}
            />
            <Input
              type="text"
              name="names.lastName"
              id="names.lastName"
              required
              disabled
              label="Last Name"
              placeholder={query.isPending ? '...' : 'Last Name'}
              register={registerForm}
              value={formValues.names.lastName}
            />
            <Input
              type="text"
              name="username"
              id="username"
              required
              disabled
              label="Username"
              placeholder={query.isPending ? '...' : 'Username'}
              register={registerForm}
              value={formValues.username}
            />
            <Input
              type="email"
              name="email"
              id="email"
              required
              label="Email"
              placeholder="john@doe.com"
              register={registerForm}
            />
            <Input
              type="text"
              name="referralCode"
              id="referralCode"
              label="Referral Code"
              placeholder="Referral Code"
              register={registerForm}
            />
            <Input
              type="password"
              name="password"
              id="password"
              required
              label="Password"
              placeholder="Password"
              register={registerForm}
              errorMessage={errors['password']?.message}
            />
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              label="Confirm Password"
              placeholder="Confirm Password"
              register={registerForm}
              errorMessage={errors['confirmPassword']?.message}
            />
            <Altcha />
            <Button type="submit" padding="1rem" fullWidth>
              <>
                {mutation.isPending && 'Registering...'}
                {mutation.error && 'Try Again'}
                {mutation.isIdle && 'Register'}
                {mutation.isSuccess && `Registered`}
              </>
            </Button>
          </form>
        )}
        {!successfulRegistration && <Links links={links} />}
      </div>
    </Template>
  );
};

export default Register;
