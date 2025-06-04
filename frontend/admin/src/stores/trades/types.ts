import { Cryptocurrency } from '../cryptocurrencies/types';
import { Fiat } from '../fiats/types';

export type TierName = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export type Tier = {
	level: number;
	name: TierName;
};

export type KYC = {
	id?: string;
};

export type UserLanguage = {
	language: {
		name: string;
	};
};

export type Count = {
	blockers?: number;
	trusters?: number;
	feedbackTrader?: number;
	tradeVendor?: number;
	tradeTrader?: number;
};

export type FeedbacksVendor = {
	id?: string;
	firstName?: string;
	lastName?: string;
	username?: string;
	profileColor?: string;
};

export type User = {
	_count?: Count;
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	profileColor: string;
	lastLoginAt: string;
	tier?: Tier;
	kyc?: KYC;
	userLanguage?: UserLanguage[];
	feedbacksVendor?: FeedbacksVendor[];
};

export type Vendor = User;
export type Trader = User;
export type Chat = {
	id: string;
};

export type PaymentReceipt = {
	name: string;
	url: string;
};

export type Status =
	| 'PENDING'
	| 'IN_PROGRESS'
	| 'COMPLETED'
	| 'CANCELLED'
	| 'DISPUTED'
	| 'EXPIRED';

export type Trade = {
	id: string;
	vendor: string;
	trader: string;
	crypto: string;
	cryptoAmount: string;
	fiatAmount: string;
	paymentMethod: string;
	status: string;
	startedAt: string;
};

export type TradesState = {
	data: Trade[];
	totalPages: number;
	currentPage: number;
	pageSize: number;
};

export type SetterParams = {
	data?: any[];
	totalPages?: number;
	currentPage?: number;
	pageSize?: number;
};
