'use client';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';

import { createUser, listUsers, users } from '@/stores/users';
import type { CreateUserParams, UseUsersParams } from './types';

const useUsers = (fetchData?: UseUsersParams) => {
  const $users = useStore(users);

  const handleCreateUser = async (data: CreateUserParams) => {
    await createUser(data);
  };

  const handleListUsers = async () => {
    await listUsers();
  };

  useEffect(() => {
    if (fetchData) {
      handleListUsers();
    }
  }, [fetchData]);

  return { handleCreateUser, handleListUsers, users: $users };
};

export default useUsers;
