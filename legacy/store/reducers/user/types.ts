export type Language = {
	id: string;
	name: string;
};

export type User = {
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
};

export type UserResponse = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	profileColor: string;
	createdAt: string;
	updatedAt: string;
	languages: Language[];
};

export type UserState = {
	data?: User;
	loading: boolean;
	fetched: boolean;
	errors: string[];
};

export type LoginUserPayload = {
	username: string;
	password: string;
};
