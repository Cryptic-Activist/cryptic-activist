export type UseUsersParams = boolean;
export type CreateUserParams = {
	names: {
		firstName: string;
		lastName: string;
	};
	username: string;
	password: string;
	password2: string;
};

export type AdminRole =
	| 'AUDITOR'
	| 'DISPUTE_MANAGER'
	| 'FINANCE_MANAGER'
	| 'KYC_REVIEWER'
	| 'MODERATOR'
	| 'SENIOR_ADMIN'
	| 'SUPER_ADMIN'
	| 'SUPPORT_AGENT';
