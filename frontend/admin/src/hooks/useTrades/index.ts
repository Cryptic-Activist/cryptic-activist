import { setCurrentPage, setTrades, trades } from '@/stores';

import { ColumnDef } from '@tanstack/react-table';
import { getLocaleFullDateString } from '@/utils/date';
import { getTrades } from '@/services/trades';
import { toUpperCase } from '@/utils';
import { tradesColumns } from './data';
import { useAdmin } from '..';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useStore } from '@nanostores/react';

const useTrades = () => {
	const { admin } = useAdmin();
	const $trades = useStore(trades);

	const tradesMutation = useMutation({
		mutationFn: async () => {
			if (admin.data?.id) {
				const recentTrades = await getTrades({
					page: $trades.currentPage,
					pageSize: $trades.pageSize
				});

				return recentTrades;
			}
		},
		onSuccess: (response) => {
			const mappedTrades = response?.data?.map((rt: any) => ({
				id: rt.id,
				vendor: rt.vendor.username,
				trader: rt.trader.username,
				crypto: toUpperCase(rt.cryptocurrency.symbol),
				cryptoAmount: rt.cryptocurrencyAmount,
				fiatAmount: `${rt.fiatAmount} ${toUpperCase(rt.fiat?.symbol)}`,
				paymentMethod: rt.paymentMethod.name,
				status: rt.status,
				startedAt: getLocaleFullDateString(new Date(rt.startedAt))
			}));
			setTrades({
				data: mappedTrades,
				currentPage: response.currentPage,
				pageSize: response.pageSize,
				totalPages: response.totalPages
			});
		}
	});

	useEffect(() => {
		tradesMutation.mutate();
	}, [
		$trades.totalPages,
		$trades.currentPage,
		$trades.pageSize,
		admin.data?.id
	]);

	const onChangePage = (page: number) => {
		setCurrentPage(page);
	};

	const handleRowAction = () => {
		console.log('tssted');
	};

	return { $trades, onChangePage, handleRowAction, tradesColumns };
};

export default useTrades;
