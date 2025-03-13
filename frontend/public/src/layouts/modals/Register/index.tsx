'use client';

import { Input, Links } from '@/components/forms';

import { Button } from '@/components';
import { Template } from '@/layouts/modals';
import styles from './index.module.scss';
import { useRegister } from '@/hooks';
import { useRootStore } from '@/zustand';

const Register = () => {
  const {
    registerForm,
    handleSubmit,
    formValues,
    onSubmit,
    errors,
    mutation,
    query,
    timeLeftInSeconds,
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
    {
      label: 'Verify account',
      onClick: () => {
        resetNavigationBar();
        toggleModal('verifyAccount');
      },
    },
  ];

  return (
    <Template width="20rem" heading="Register">
      <div className={styles.container}>
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
          <Button type="submit" padding="1rem" fullWidth>
            <>
              {mutation.isPending && 'Registering...'}
              {mutation.error && 'Error'}
              {mutation.isIdle && 'Register'}
              {mutation.isSuccess &&
                `Registered. Next step in ${timeLeftInSeconds}`}
            </>
          </Button>
        </form>

        <Links links={links} />
      </div>
    </Template>
  );
};

export default Register;
