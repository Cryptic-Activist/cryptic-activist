import React from 'react';
import { withAuthAdvanced } from '@/hoc/withAuth';

const Offers = () => {
	return <div>Offers</div>;
};

export default withAuthAdvanced(Offers, {
	roles: ['SUPER_ADMIN', 'SENIOR_ADMIN']
});
