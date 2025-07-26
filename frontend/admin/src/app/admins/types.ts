import { Role } from '@/stores/admins';

export type SelectedAdmin = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	roles: Role[];
	isActive: boolean;
};
