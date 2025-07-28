import React from 'react';
import { withAuthAdvanced } from '@/hoc/withAuth';

const Chats = () => {
	return <div>Chats</div>;
};

export default withAuthAdvanced(Chats, {
	roles: ['SUPER_ADMIN']
});
