'use client';

import { CryptocurrenciesList as List } from '@/components/lists';
import useCryptocurrencies from '@/hooks/useCryptocurrencies';
import { withAuthAdvanced } from '@/hoc/withAuth';

const Cryptocurrencies = () => {
	const { cryptocurrencies } = useCryptocurrencies(true);

	return <List items={cryptocurrencies.data} />;
};

export default withAuth(Cryptocurrencies);
	roles: ['SUPER_ADMIN']
});
