import { ISubmitCreateOffer } from 'types/store/reducers';

export const toggleSection = (
	section: 'paymentMethod' | 'tradePricing' | 'tradeInstructions'
): {
	type: 'TOGGLE_SECTION';
	payload: {
		section: 'paymentMethod' | 'tradePricing' | 'tradeInstructions';
	};
} => {
	return {
		type: 'TOGGLE_SECTION',
		payload: {
			section,
		},
	};
};

export const setValue = (
	object: any
): {
	type: 'SET_VALUE';
	payload: {
		object: any;
	};
} => {
	return {
		type: 'SET_VALUE',
		payload: { object },
	};
};

export const checkIsCompleted = (
	section: 'paymentMethod' | 'tradePricing' | 'tradeInstructions'
): {
	type: 'CHECK_IS_COMPLETED';
	payload: {
		section: 'paymentMethod' | 'tradePricing' | 'tradeInstructions';
	};
} => {
	return {
		type: 'CHECK_IS_COMPLETED',
		payload: {
			section,
		},
	};
};

export const checkIsFilled = (): {
	type: 'CHECK_IS_FILLED';
} => {
	return {
		type: 'CHECK_IS_FILLED',
	};
};

export const resetCreate = (): {
	type: 'RESET_CREATE';
} => {
	return {
		type: 'RESET_CREATE',
	};
};

export const setCurrentCryptocurrencyPrice = (
	coingecko_id: string,
	fiatSymbol: string
): {
	type: 'REQUEST_SET_CURRENT_CRYPTOCURRENCY_PRICE';
	payload: {
		coingecko_id: string;
		fiatSymbol: string;
	};
} => {
	return {
		type: 'REQUEST_SET_CURRENT_CRYPTOCURRENCY_PRICE',
		payload: {
			coingecko_id,
			fiatSymbol,
		},
	};
};

export const submitOffer = (
	createOffer: ISubmitCreateOffer
): {
	type: 'REQUEST_SUBMIT_OFFER';
	payload: {
		createOffer: ISubmitCreateOffer;
	};
} => {
	return {
		type: 'REQUEST_SUBMIT_OFFER',
		payload: {
			createOffer,
		},
	};
};
