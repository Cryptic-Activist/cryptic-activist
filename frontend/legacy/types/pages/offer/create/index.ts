import { ChangeEvent } from 'react';

import {
	IApp,
	IFiats,
	ICryptocurrencies,
	IUser,
	ICreate,
} from '../../../store/reducers';
import {
	ICryptocurrencyResponse,
	IFiatResponse,
} from '../../../store/reducers/response';

export interface ICreateOffer {}

export interface IOfferObj {
	vendor_id: string;
	fiat_id: string;
	cryptocurrency_id: string;
	payment_method_type: 'buy' | 'sell';
	payment_method_id: string;
	trade_pricing_type: 'market' | 'fixed';
	trade_pricing_list_at: number;
	trade_pricing_trade_limits_min: number;
	trade_pricing_trade_limits_max: number;
	trade_pricing_time_limit: number;
	trade_instructions_tags: string[];
	trade_instructions_label: string;
	trade_instructions_terms: string;
	trade_instructions_instructions: string;
}

export interface INewOfferResponse {
	errors: string[];
	results: {
		vendor_id: string;
		cryptocurrency_id: string;
		payment_method_type: string;
		payment_method_id: string;
		trade_pricing_type: string;
		trade_pricing_list_at: number;
		trade_pricing_trade_limits_min: number;
		trade_pricing_trade_limits_max: number;
		trade_pricing_time_limit: number;
		trade_instructions_tags: string[];
		trade_instructions_label: string;
		trade_instructions_terms: string;
		trade_instructions_instructions: string;
		is_deleted: boolean;
		when_deleted: null | string;
		createdAt: string;
		updatedAt: string;
	};
	status_code: number;
}

export interface IPaymentMethod {}

export interface ITradePricing {}

export interface ITradeInstructions {
	app: IApp;
	create: ICreate;
	user: IUser;
}
