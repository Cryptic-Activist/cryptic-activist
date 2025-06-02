'use client';

import { getRecentTrades } from '@/services/dashboard';
import { useAdmin } from '..';
import { useQueries } from '@tanstack/react-query';

const useDashboard = () => {
	const { admin } = useAdmin();
	const queries = useQueries({
		queries: [
			{
				queryKey: ['recentTrades'],
				queryFn: async () => {
					if (admin.data?.id) {
						const recentTrades = await getRecentTrades();

						return recentTrades;
					}
				},
				enabled: !!admin.data?.id
			}
		]
	});

	console.log({ queries, admin });

	return {};
};

export default useDashboard;
