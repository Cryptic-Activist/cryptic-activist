export type SystemMessage = {
	id: string;
};

export type SystemMessagesState = {
	data?: SystemMessage[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
};

export type GetSystemMessagesParams = {
	id: string;
};
