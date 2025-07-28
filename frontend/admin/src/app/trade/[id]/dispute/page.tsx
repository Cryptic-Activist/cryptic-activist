import React from 'react';
import { withAuthAdvanced } from '@/hoc/withAuth';

const TradeDispute = () => {
	return <div>TradeDispute</div>;
};

export default withAuthAdvanced(TradeDispute, {
	roles: ['DISPUTE_MANAGER', 'SUPER_ADMIN', 'SENIOR_ADMIN']
});
