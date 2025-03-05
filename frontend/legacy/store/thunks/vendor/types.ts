import type { Language } from '@store/reducers/user/types';

export type GetVendorParams = {
	username: string;
};

export type GetVendorReturn = {
	results: {
		id: string;
		firstName: string;
		lastName: string;
		username: string;
		profileColor: string;
		createdAt: string;
		updatedAt: string;
		languages: Language[];
		blocked: any[];
		blockers: any[];
		trusted: any[];
		tradesCount: number;
	};
};
