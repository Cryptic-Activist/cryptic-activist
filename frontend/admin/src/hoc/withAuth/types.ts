import { AdminRole } from '@/hooks/useAdmin/types';
import type { ReactNode } from 'react';

export interface WithAuthOptions {
	redirectTo?: string;
	cookieName?: string;
	loadingComponent?: ReactNode;
	unauthorizedComponent?: ReactNode;
	checkInterval?: number;
	roles?: AdminRole[];
}

export interface WithAuthAdvancedOptions extends WithAuthOptions {
	validateToken?: (token: string) => Promise<boolean> | boolean;
}

export interface AuthHookResult {
	isAuthenticated: boolean | null;
	isLoading: boolean;
}
