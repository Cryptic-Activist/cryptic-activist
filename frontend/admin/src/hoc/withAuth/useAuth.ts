'use client';

import { useEffect, useState } from 'react';

import { AdminRole } from '@/hooks/useAdmin/types';
import { getCookie } from '@/utils';
import { useAdmin } from '@/hooks';
import { validateWithAuthToken } from '@/services/admin';

export const useAuth = (roles: AdminRole[] = []) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { hasRoles, admin: adminStore } = useAdmin();

	useEffect(() => {
		const checkAuth = async () => {
			const token = getCookie('accessToken');
			let hasRequiredRole = true;

			if (roles && roles.length > 0) {
				hasRequiredRole = hasRoles(roles);
			}

			if (token && hasRequiredRole) {
				try {
					const isValid = await validateWithAuthToken();
					setIsAuthenticated(isValid);
				} catch (error) {
					setIsAuthenticated(false);
				}
			} else {
				setIsAuthenticated(false);
			}
			setIsLoading(false);
		};

		checkAuth();
	}, [roles, adminStore.data?.roles]);

	return { isAuthenticated, isLoading };
};
