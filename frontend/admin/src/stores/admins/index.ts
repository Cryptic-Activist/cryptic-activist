import { AdminRole } from '../admin/types';
import { map } from 'nanostores';

export type Role =
	| 'AUDITOR'
	| 'DISPUTE_MANAGER'
	| 'FINANCE_MANAGER'
	| 'KYC_REVIEWER'
	| 'MODERATOR'
	| 'SENIOR_ADMIN'
	| 'SUPER_ADMIN'
	| 'SUPPORT_AGENT';

export interface Admin {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	roles: AdminRole[];
	active: boolean;
}

export interface AdminsStore {
	admins: Admin[];
}

export const admins = map<AdminsStore>({
	admins: []
});

export const setAdmins = (newAdmins: Admin[]) => {
	admins.setKey('admins', newAdmins);
};
