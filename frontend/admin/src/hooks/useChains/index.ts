'use client';

import { CreateChainParams, UseChainsParams } from './types';
import { chains, setChains } from '@/stores/chains';
import { useQueries, useQuery } from '@tanstack/react-query';

import { getSupportedChains } from '@/services/chains';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

const useChains = (fetchData?: UseChainsParams) => {
	const $chains = useStore(chains);

	const chainsQuery = useQuery({
		queryKey: ['chains'],
		queryFn: getSupportedChains
	});

	useEffect(() => {
		if (chainsQuery.data?.length > 0) {
			setChains({ data: chainsQuery.data });
		}
	}, [chainsQuery.data]);

	return {
		chains: $chains
	};
};

export default useChains;
