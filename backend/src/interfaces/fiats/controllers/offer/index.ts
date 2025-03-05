export type IUserResponse = {
	id: number;
	names: {
		first_name: string;
		last_name: string;
	};
	username: string;
	is_verified: boolean;
	created_at: string;
	updated_at: null | string;
};
