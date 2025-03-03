export type Language = {
	id: string;
	name: string;
};

export type Vendor = {
	id: string;
	names: {
		firstName: string;
		lastName: string;
	};
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

export type VendorState = {
	data?: Vendor;
	loading: boolean;
	fetched: boolean;
	errors: string[];
};

export type LoginUserPayload = {
	username: string;
	password: string;
};
