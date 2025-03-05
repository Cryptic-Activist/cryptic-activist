import { fetchGet } from '@services/axios';
import { useAppDispatch, useAppSelector } from '@store/index';
import { getBuyOffers, getSellOffers } from '@store/reducers/offers';
import { Offer } from '@store/reducers/offers/types';

import { getOffersPagination as getOffersPaginationThunk } from '@store/thunks/offers';
import { useEffect, useState } from 'react';

import { GetOffersPaginationParams, UseOfferParams } from './types';

const useOffer = (id?: UseOfferParams) => {
	const dispatch = useAppDispatch();
	const { offers, app } = useAppSelector((state) => state);
	const [offer, setOffer] = useState<Offer>();

	const getOffersPagination = (params: GetOffersPaginationParams) => {
		dispatch(getOffersPaginationThunk(params));
	};

	const getOfferDetails = async () => {
		const offer = await fetchGet(
			`${process.env.OFFER_API}/offer?id=${id}&associations=vendor,fiat,cryptocurrency,paymentMethod`
		);

		setOffer(offer.data.results);
	};

	useEffect(() => {
		if (id) {
			getOfferDetails();
		} else {
			dispatch(getBuyOffers());
			dispatch(getSellOffers());
		}
	}, [offers.data, id]);

	useEffect(() => {
		const obj: any = {};

		if (
			app.defaults.paymentMethod?.id !== null ||
			app.defaults.paymentMethod?.id
		) {
			obj.paymentMethodId = app.defaults.paymentMethod?.id;
		}
		if (app.defaults.fiat?.id !== null || app.defaults.fiat?.id) {
			obj.fiatId = app.defaults.fiat?.id;
		}
		if (
			app.defaults.cryptocurrency?.id !== null ||
			app.defaults.cryptocurrency?.id
		) {
			obj.cryptocurrencyId = app.defaults.cryptocurrency?.id;
		}

		getOffersPagination({
			limit: 10,
			skip: 0,
			paymentMethodType: app.type,
			...obj,
		});
	}, [
		app.type,
		app.defaults.fiat,
		app.defaults.cryptocurrency,
		app.defaults.paymentMethod,
	]);

	// useEffect(() => {
	// 	getOffersPagination({
	// 		limit: 10,
	// 		skip: 0,
	// 		paymentMethodType: app.type,
	// 	});
	// }, [app.type]);

	return { getOffersPagination, offer, offers };
};

export default useOffer;
