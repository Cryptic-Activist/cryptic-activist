import { AdminRole } from '@/stores/admin/types';

export type SideBarProps = {
	href: string;
	label: string;
	icon?: any;
};

type Role =
	| 'AUDITOR'
	| 'DISPUTE_MANAGER'
	| 'FINANCE_MANAGER'
	| 'KYC_REVIEWER'
	| 'MODERATOR'
	| 'SENIOR_ADMIN'
	| 'SUPER_ADMIN'
	| 'SUPPORT_AGENT';

export type SideBarData = {
	href: string;
	label: string;
	icon: string;
	roles: Role[];
};
