'use client';

import { FiatsList as List } from '@/components/lists';
import React from 'react';
import useFiats from '@/hooks/useFiats';

const Fiats = () => {
	const { fiats } = useFiats(true);

	return <List items={fiats.data} />;
};

export default Fiats;
