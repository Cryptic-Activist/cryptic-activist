import { Admin } from '../admin/types';

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
	id: string;
	tradeId: string;
	complainant: User;
	respondent: User;
	type: string;
	amount: string;
	severity: DisputeSeverity;
	status: DisputeStatus;
	priority: DisputePriority;
	moderator: Moderator;
	createdAt: string;
	slaDueAt: string;
};

export type DisputesState = {
	data: Dispute[];
	totalPages: number;
	currentPage: number;
	pageSize: number;
	filters?: Filters;
};

export type SetterParams = {
	data?: any[];
	totalPages?: number;
	currentPage?: number;
	pageSize?: number;
	filters?: Filters;
};
