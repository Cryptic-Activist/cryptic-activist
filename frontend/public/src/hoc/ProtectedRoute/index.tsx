'use client';

import { FC, useEffect } from 'react';

import { useUser } from '@/hooks';

import { ProtectedRouteProps } from './types';

let count = 0;

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (count > 0) {
      if (user.fetched && user.data === undefined) {
        window.location.pathname = '/';
        return;
      }
    }

    count += 1;
  }, [user.fetched, user.data]);

  return <>{children}</>;
};

export default ProtectedRoute;
