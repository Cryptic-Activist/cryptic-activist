'use client';

import { FiatsList as List } from '@/components/lists';
import React from 'react';
import useFiats from '@/hooks/useFiats';
import { withAuthAdvanced } from '@/hoc/withAuth';

const Fiats = () => {
	const { fiats } = useFiats(true);

	return <List items={fiats.data} />;
};

export default withAuthAdvanced(Fiats, {
	roles: ['SUPER_ADMIN']
});
