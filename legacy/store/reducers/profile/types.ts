type Feedback = {
	id: string;
	vendor: string;
	trader: string;
	offer: string;
	message: string;
	type: 'positive' | 'negative';
	createdAt: string;
	updatedAt: string;
};

type Block = {
	id: string;
	blocker: string;
	blocked: string;
	createdAt: string;
};

type Trust = {
	truster: string;
	trusted: string;
	createdAt: string;
};

export type ProfileState = {
	data: {
		feedbacks: Feedback[];
		blocks: Block[];
		trusts: Trust[];
	};
	loading: boolean;
	fetched: boolean;
	errors: string[];
};
