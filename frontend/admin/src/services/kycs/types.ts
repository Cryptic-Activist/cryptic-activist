import { KYCStatus } from '@/stores/kycs/types';

export type GetKYCsParams = {
	page: number;
	pageSize: number;
	status?: KYCStatus;
	username?: string;
};

export type Filter = 'status';
