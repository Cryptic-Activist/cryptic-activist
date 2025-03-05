import type { Language } from '@store/reducers/user/types';

export type LoginUserParams = {
	username: string;
	password: string;
};

export type GetTokensReturn = {
	results: {
		accessToken: string;
		refreshToken: string;
	};
};

export type GetUserInfoReturn = {
	results: {
		id: string;
		firstName: string;
		lastName: string;
		username: string;
		profileColor: string;
		createdAt: string;
		updatedAt: string;
		languages: Language[];
	};
};
