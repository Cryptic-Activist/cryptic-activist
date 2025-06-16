'use client';

import { UsersList as List } from '@/components/lists';
import React from 'react';
import useUsers from '@/hooks/useUsers';

const Users = () => {
	const { users } = useUsers(true);

	return <List items={users.data} />;
};

export default Users;
