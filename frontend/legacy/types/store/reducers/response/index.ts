export interface ICryptocurrencyResponse {
	createdAt: string;
	coingecko_id: string;
	icon: string;
	id: string;
	is_deleted: boolean;
	name: string;
	symbol: string;
	updatedAt: string;
	when_deleted: null | string;
}

export interface IFiatResponse {
	createdAt: string;
	icon: string;
	id: string;
	is_deleted: boolean;
	name: string;
	symbol: string;
	updatedAt: string;
	when_deleted: null | string;
}

export interface IUserResponse {
	id: string;
	username: string;
	is_verified: boolean;
	created_at: string;
	updated_at: null | string;
	names: {
		firstName: string;
		lastName: string;
	};
	profile_image?: {
		url: string;
	};
	languages?: {
		name: string;
	}[];
}

export interface IPaymentMethodCategoryResponse {
	id: string;
	name: string;
	is_deleted: boolean;
	when_deleted: null | string;
	createdAt: string;
	updatedAt: string;
}

export interface IPaymentMethodResponse {
	id: string;
	name: string;
	is_deleted: boolean;
	when_deleted: null | string;
	createdAt: string;
	updatedAt: string;
	payment_method_category: IPaymentMethodCategoryResponse;
}

export interface IOfferResponse {
	id: string;
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
	is_deleted: boolean;
	when_deleted: null | string;
	created_at: string;
	updated_at: string;
	vendor?: IUserResponse;
	payment_method?: IPaymentMethodResponse;
	cryptocurrency?: ICryptocurrencyResponse;
	fiat?: IFiatResponse;
}

export interface IWalletResponse {
	address: string;
}

export interface ISystemMessagesResponse {
	createdAt: string;
	id: string;
	is_deleted: boolean;
	message: string;
	trade: any;
	trade_id: number;
	updatedAt: string;
	user: any;
	user_id: string;
	when_deleted: null | Date;
	when_seen: null | Date;
}
