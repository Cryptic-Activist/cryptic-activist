import { Cryptocurrency } from '../cryptocurrencies/types';
import { Fiat } from '../fiats/types';
import { Offer } from '../offers/types';

export type Trade = {
	id: string;
	paymentReceiptId: string;
	vendorId: string;
	traderId: string;
	offerId: string;
	cryptocurrencyId: string;
	fiatId: string;
	cryptocurrencyAmount: number;
	fiatAmount: number;
	startedAt: string;
	endedAt: string;
	state: string;
	paid: boolean;
	isDeleted: boolean;
	whenDeleted: string;
	createdAt: string;
	updatedAt: string;
	paymentReceipt?: any;
	offer?: Offer;
	cryptocurrency?: Cryptocurrency;
	fiat?: Fiat;
	vendor?: any;
	trader?: any;
};

export type TradeState = {
	data?: Trade;
	loading: boolean;
	fetched: boolean;
	errors: string[];
};

export type CreateTradeParam = {
	vendorId: string;
	traderId: string;
	offerId: string;
	cryptocurrencyId: string;
	fiatId: string;
	cryptocurrencyAmount: number;
	fiatAmount: number;
};

export type GetTradeParams = {
	id: string;
};
