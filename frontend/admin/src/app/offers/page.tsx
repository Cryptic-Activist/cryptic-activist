'use client';

import React from 'react';
import { withAuth } from '@/hoc/withAuth';

const Offers = () => {
	return <div>Offers</div>;
};

export default withAuth(Offers, {
	roles: ['SUPER_ADMIN', 'SENIOR_ADMIN']
});
