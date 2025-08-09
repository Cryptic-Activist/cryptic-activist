import type { ReactNode } from 'react';
import type { Role } from '@/stores/admins';

export interface WithAuthOptions {
	redirectTo?: string;
	cookieName?: string;
	loadingComponent?: ReactNode;
	unauthorizedComponent?: ReactNode;
	checkInterval?: number;
	roles?: Role[];
}

export interface WithAuthAdvancedOptions extends WithAuthOptions {
	validateToken?: (token: string) => Promise<boolean> | boolean;
}

export interface AuthHookResult {
	isAuthenticated: boolean | null;
	isLoading: boolean;
}
