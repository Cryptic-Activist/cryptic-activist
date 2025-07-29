import { SideBarData } from './types';

export const sidebarItems: SideBarData[] = [
	{
		href: '/dashboard',
		label: 'Dashboard',
		icon: 'RxBarChart',
		roles: ['SUPER_ADMIN', 'DISPUTE_MANAGER', 'SENIOR_ADMIN']
	},
	{
		href: '/admins',
		label: 'Admins',
		icon: 'FaUserShield',
		roles: ['SUPER_ADMIN']
	},
	{
		href: '/users',
		label: 'Users',
		icon: 'FaUsers',
		roles: ['SUPER_ADMIN', 'SENIOR_ADMIN']
	},
	{
		href: '/kyc',
		label: 'KYC',
		icon: 'FaIdCard',
		roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'KYC_REVIEWER']
	},
	{
		href: '/offers',
		label: 'Offers',
		icon: 'FaTags',
		roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'DISPUTE_MANAGER']
	},
	{
		href: '/trades',
		label: 'Trades',
		icon: 'FaHandshakeSimple',
		roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'DISPUTE_MANAGER']
	},
	{
		href: '/disputes',
		label: 'Disputes',
		icon: 'FaTriangleExclamation',
		roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'DISPUTE_MANAGER']
	},
	{
		href: '/payment-methods',
		label: 'Payment Method',
		icon: 'FaCreditCard',
		roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'FINANCE_MANAGER']
	},
	{
		href: '/payment-method-categories',
		label: 'Payment Method Categories',
		icon: 'FaLayerGroup',
		roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'FINANCE_MANAGER']
	},
	{
		href: '/chats',
		label: 'Chats',
		icon: 'FaComments',
		roles: ['SUPER_ADMIN', 'SENIOR_ADMIN', 'DISPUTE_MANAGER']
	},
	{
		href: '/fiats',
		label: 'Fiats',
		icon: 'FaDollarSign',
		roles: ['SUPER_ADMIN']
	},
	{
		href: '/cryptocurrencies',
		label: 'Cryptocurrencies',
		icon: 'FaBitcoin',
		roles: ['SUPER_ADMIN']
	},
	{
		href: '/analytics',
		label: 'Analytics',
		icon: 'FaChartLine',
		roles: ['SUPER_ADMIN', 'FINANCE_MANAGER']
	},
	{
		href: '/smart-contracts',
		label: 'Smart Contracts',
		icon: 'FaLink',
		roles: ['SUPER_ADMIN']
	},
	{
		href: '/settings',
		label: 'Platform Settings',
		icon: 'FaGears',
		roles: ['SUPER_ADMIN']
	}
];
