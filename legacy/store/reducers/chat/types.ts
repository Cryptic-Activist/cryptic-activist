export type Chat = {
	id: string;
	tradeId: string;
	isDeleted: boolean;
	whenDeleted: string;
	createdAt: string;
	updatedAt: string;
};

export type ChatState = {
	data?: Chat;
	loading: boolean;
	fetched: boolean;
	errors: string[];
};

export type CreateChatParam = {
	tradeId: string;
};
