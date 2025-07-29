'use client';

import { UsersList as List } from '@/components/lists';
import React from 'react';
import useUsers from '@/hooks/useUsers';
import { withAuth } from '@/hoc/withAuth';

const Users = () => {
	const { users } = useUsers(true);

	return <List items={users.data} />;
};

export default withAuth(Users, {
	roles: ['SUPER_ADMIN', 'SENIOR_ADMIN'],
});
