import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createTrade, getTrade as getTradeThunk } from '@store/thunks/trade';
import { useEffect } from 'react';
import { CreateTradeParams, UseTradeId } from './types';

const useTrade = (id?: UseTradeId) => {
	const dispatch = useAppDispatch();
	const { trade } = useAppSelector((state) => state);

	const startTrade = async (params: CreateTradeParams) => {
		dispatch(createTrade(params));
	};

	const getTrade = (id: string) => {
		dispatch(getTradeThunk({ id }));
	};

	useEffect(() => {
		if (id) {
			getTrade(id);
		}
	}, [id]);

	return { trade, startTrade, getTrade };
};

export default useTrade;
