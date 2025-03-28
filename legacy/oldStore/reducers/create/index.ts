import update from 'immutability-helper';

import { ICreate } from 'types/store/reducers';

const initialState: ICreate = {
	data: {
		section: {
			paymentMethod: true,
			tradePricing: false,
			tradeInstructions: false,
		},
		cryptocurrency: null,
		cryptocurrencyObj: null,
		fiat: null,
		fiatObj: null,
		paymentMethodType: 'sell',
		category: null,
		selection: null,
		isPaymentMethodCompleted: false,
		currentCryptocurrencyPrice: 0,
		tradePricingType: 'market',
		listAt: 0,
		limitMin: 10,
		limitMax: 10000,
		timeLimit: 10,
		isTradePricingCompleted: false,
		tags: [],
		label: '',
		terms: '',
		instructions: '',
		isTradeInstructionsCompleted: false,
		isFilled: false,
		isSubmitted: false,
	},
	loading: false,
	fetched: false,
	errors: [],
};

export default function create(state = initialState, action) {
	switch (action.type) {
		case 'TOGGLE_SECTION':
			return update(state, {
				data: {
					section: {
						paymentMethod: { $set: false },
						tradePricing: { $set: false },
						tradeInstructions: { $set: false },
						[action.payload.section]: {
							$set: !state.data.section[action.payload.section],
						},
					},
				},
			});
		case 'SET_VALUE':
			return update(state, {
				data: {
					[Object.keys(action.payload.object)[0]]: {
						$set: Object.values(action.payload.object)[0],
					},
				},
			});
		case 'CHECK_IS_COMPLETED':
			let isCompleted: boolean = false;

			switch (action.payload.section) {
				case 'paymentMethod': {
					const { cryptocurrency, fiat, paymentMethodType, category, selection } =
						state.data;

					isCompleted =
						typeof cryptocurrency === 'string' &&
						typeof fiat === 'string' &&
						paymentMethodType.length > 0 &&
						typeof category === 'string' &&
						typeof selection === 'string';
					break;
				}
				case 'tradePricing': {
					const { tradePricingType, listAt, limitMin, limitMax, timeLimit } =
						state.data;

					isCompleted =
						typeof tradePricingType === 'string' &&
						typeof listAt === 'number' &&
						typeof limitMin === 'number' &&
						typeof limitMax === 'number' &&
						typeof timeLimit === 'number';
					break;
				}
				case 'tradeInstructions': {
					const { tags, label, terms, instructions } = state.data;
					isCompleted =
						tags.length > 0 &&
						label &&
						label.length > 0 &&
						terms &&
						terms.length > 0 &&
						instructions &&
						instructions.length > 0;
					break;
				}
			}

			return update(state, {
				data: {
					[`is${action.payload.section[0].toUpperCase()}${action.payload.section.substring(
						1,
						action.payload.section.length
					)}Completed`]: {
						$set: isCompleted,
					},
				},
			});
		case 'RESET_CREATE':
			return update(state, {
				data: {
					section: {
						paymentMethod: { $set: true },
						tradePricing: { $set: false },
						tradeInstructions: { $set: false },
					},
					paymentMethodType: { $set: 'sell' },
					category: { $set: null },
					selection: { $set: null },
					isPaymentMethodCompleted: { $set: false },
					currentCryptocurrencyPrice: { $set: 0 },
					tradePricingType: { $set: 'market' },
					listAt: { $set: 0 },
					limitMin: { $set: 10 },
					limitMax: { $set: 10000 },
					timeLimit: { $set: 10 },
					isTradePricingCompleted: { $set: false },
					tags: { $set: [] },
					label: { $set: '' },
					terms: { $set: '' },
					instructions: { $set: '' },
					isTradeInstructionsCompleted: { $set: false },
					isFilled: { $set: false },
					isSubmitted: { $set: false },
				},
				loading: { $set: false },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case 'CHECK_IS_FILLED': {
			const {
				isPaymentMethodCompleted,
				isTradeInstructionsCompleted,
				isTradePricingCompleted,
			} = state.data;
			const isFilled: boolean =
				isPaymentMethodCompleted &&
				isTradeInstructionsCompleted &&
				isTradePricingCompleted;

			return update(state, {
				data: { isFilled: { $set: isFilled } },
			});
		}
		case 'SUCCESS_SET_CURRENT_CRYPTOCURRENCY_PRICE': {
			return update(state, {
				data: { currentCryptocurrencyPrice: { $set: action.payload.data } },
			});
		}
		case 'FAILURE_SET_CURRENT_CRYPTOCURRENCY_PRICE': {
			return update(state, {
				data: { currentCryptocurrencyPrice: { $set: action.payload.data } },
			});
		}
		case 'REQUEST_SUBMIT_OFFER':
			return update(state, {
				loading: { $set: true },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case 'SUCCESS_SUBMIT_OFFER':
			return update(state, {
				data: {
					isSubmitted: { $set: true },
				},
				loading: { $set: false },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case 'FAILURE_SUBMIT_OFFER':
			return update(state, {
				loading: { $set: false },
				fetched: { $set: false },
				errors: { $set: action.payload.data },
			});
		default:
			return state;
	}
}
