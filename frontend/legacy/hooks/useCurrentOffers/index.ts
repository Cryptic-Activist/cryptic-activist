import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@store/index';
import { setType } from '@store/reducers/app';
import {
	getBuyCurrentOffers,
	getSellCurrentOffers,
} from '@store/reducers/currentOffers';
import { getCurrentOffers } from '@store/thunks/currentOffers';

import { UseCurrentOffersProps } from './types';

const useCurrentOffers = ({ id }: UseCurrentOffersProps) => {
	const dispatch = useAppDispatch();
	const { currentOffers, app } = useAppSelector((state) => state);

	useEffect(() => {
		dispatch(setType('buy'));
	}, []);

	useEffect(() => {
		if (id && id.length > 0) {
			dispatch(getCurrentOffers({ type: app.type, userId: id }));
		}
	}, [app.type, id]);

	useEffect(() => {
		if (currentOffers.data) {
			dispatch(getBuyCurrentOffers());
			dispatch(getSellCurrentOffers());
		}
	}, [currentOffers.data]);

	return { currentOffers };
};

export default useCurrentOffers;
