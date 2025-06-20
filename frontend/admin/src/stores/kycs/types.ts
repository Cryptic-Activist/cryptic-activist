export type Filters = {
	username?: string;
	status?: KYCStatus;
};

export type KYCStatus = 'REJECTED' | 'PENDING' | 'APPROVED';

export type KYC = {
	id: string;
	username: string;
	submittedAt: string;
	status: KYCStatus;
};

export type KYCsState = {
	data: KYC[];
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
