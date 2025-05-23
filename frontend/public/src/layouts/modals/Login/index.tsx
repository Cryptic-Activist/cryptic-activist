'use client';

import { Input, Links } from '@/components/forms';

import { Button } from '@/components';
import { Template } from '@/layouts/modals';
import styles from './index.module.scss';
import { useRootStore } from '@/store';
import { useUser } from '@/hooks';

const Login = () => {
  const { errors, loginFormRegister, onSubmit, handleSubmit } = useUser();
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
      label: 'Forgot password?',
      onClick: () => {
        resetNavigationBar();
        toggleModal('resetPasswordRequest');
      },
    },
  ];

  return (
    <Template width="20rem" heading="Login">
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            type="text"
            name="usernameOrEmail"
            id="usernameOrEmail"
            required
            label="Username or Email"
            placeholder="Username or Email"
            register={loginFormRegister}
            errorMessage={errors['usernameOrEmail']?.message}
          />
          <Input
            type="password"
            name="password"
            id="password"
            required
            label="Password"
            placeholder="Password"
            register={loginFormRegister}
            errorMessage={errors['password']?.message}
          />

          <Button type="submit" padding="1rem" fullWidth>
            Login
          </Button>
        </form>

        <Links links={links} />
      </div>
    </Template>
  );
};

export default Login;
