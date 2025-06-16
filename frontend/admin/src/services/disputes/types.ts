import {
	DisputeSeverity,
	DisputeStatus,
	DisputeType
} from '@/stores/disputes/types';

export type GetDisputesParams = {
	page: number;
	pageSize: number;
	status?: DisputeStatus;
	severity?: DisputeSeverity;
	type?: DisputeType;
	amount?: string;
	moderatorId?: string;
};

export type Filter = 'status' | 'severity' | 'type' | 'moderator';
