export type AdminSetPasswordRequestParams = {
	unique: string;
};

export type AdminSetPasswordParams = {
	password: string;
	passwordConfirm: string;
	token: string;
};
