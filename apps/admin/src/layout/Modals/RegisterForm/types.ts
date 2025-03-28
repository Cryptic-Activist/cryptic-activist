export type RegisterUserPayload = {
	names: {
		firstName: string;
		lastName: string;
	};
	username: string;
	password: string;
	password2: string;
};
