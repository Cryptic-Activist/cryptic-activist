'use client';

import { CryptocurrenciesList as List } from '@/components/lists';
import useCryptocurrencies from '@/hooks/useCryptocurrencies';
import { withAuthAdvanced } from '@/hoc/withAuth';

const Cryptocurrencies = () => {
	const { cryptocurrencies } = useCryptocurrencies(true);

	return <List items={cryptocurrencies.data} />;
};

export default withAuthAdvanced(Cryptocurrencies, {
	roles: ['SUPER_ADMIN']
});
