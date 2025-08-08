'use client';

import React from 'react';
import { withAuth } from '@/hoc/withAuth';

const TradeDispute = () => {
	return <div>TradeDispute</div>;
};

export default withAuth(TradeDispute, {
	roles: ['DISPUTE_MANAGER', 'SUPER_ADMIN', 'SENIOR_ADMIN']
});
