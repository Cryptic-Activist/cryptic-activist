import React from 'react';
import { withAuth } from '@/hoc/withAuth';

const Chats = () => {
	return <div>Chats</div>;
};

export default withAuth(Chats, {
	roles: ['SUPER_ADMIN']
});
