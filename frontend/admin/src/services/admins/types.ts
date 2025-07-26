import { Role } from '@/stores/admins';

export type CreateAdminParams = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	roles: Role[];
};

export type UpdateAdminParams = {
	id: string;
	firstName?: string;
	lastName?: string;
	username?: string;
	email?: string;
	roles?: Role[];
	isActive?: boolean;
};
