import { Admin } from '../admin/types';
import { Cryptocurrency } from '../cryptocurrencies/types';
import { Fiat } from '../fiats/types';

type Moderator = {
	id: string;
	firstName?: string;
	lastName?: string;
	username?: string;
};

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	profileColor: string;
	lastLoginAt: string;
};

export type Filters = {
	status?: DisputeStatus;
	severity?: DisputeSeverity;
	type?: DisputeType;
	amount?: string;
	moderator?: Moderator;
};

type PaymentMethod = {
	name: string;
};

type Offer = {
	offerType: 'buy' | 'sell';
	paymentMethod: PaymentMethod;
};

type Trade = {
	cryptocurrency: Cryptocurrency;
	cryptocurrencyAmount: number;
	fiat: Fiat;
	fiatAmount: number;
	id: string;
	trader: User;
	offer: Offer;
	vendor: User;
	exchangeRate: number;
	startedAt: string;
};

export type DisputeType =
	| 'PAYMENT_NOT_RECEIVED'
	| 'PAYMENT_FRAUD'
	| 'CRYPTO_NOT_RELEASED'
	| 'INCORRECT_PAYMENT_AMOUNT'
	| 'PAYMENT_TO_WRONG_ACCOUNT'
	| 'FAKE_PAYMENT_PROOF'
	| 'LATE_PAYMENT'
	| 'COMMUNICATION_ISSUE'
	| 'OFF_PLATFORM_TRANSACTION'
	| 'TRADE_TIMEOUT'
	| 'ABUSIVE_BEHAVIOR'
	| 'IDENTITY_MISMATCH'
	| 'PLATFORM_ERROR'
	| 'SUSPICIOUS_ACTIVITY'
	| 'SCAM'
	| 'OTHER';

export type DisputePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type DisputeSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type DisputeStatus =
	| 'OPEN'
	| 'PENDING_EVIDENCE'
	| 'INVESTIGATING'
	| 'ESCALATED'
	| 'RESOLVED'
	| 'CLOSED';

export type Dispute = {
	id?: string;
	trade?: Trade;
	type?: string;
	severity?: DisputeSeverity;
	status?: DisputeStatus;
	priority?: DisputePriority;
	moderator?: Moderator;
	slaDueAt?: string;
	loser?: User;
	winner?: User;
	raisedBy?: User;
	reason?: string;
	resolutionNote?: string;
	resolvedAt?: string;
	createdAt?: string;
	updatedAt?: string;
};

export type DisputeState = Dispute;

export type SetterParams = Dispute;
