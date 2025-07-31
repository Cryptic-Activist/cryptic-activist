import { useEffect, useState } from 'react';

import { AdminRole } from '@/stores/admin/types';
import { Role } from '@/stores/admins';
import { getCookie } from '@/utils';
import { useAdmin } from '@/hooks';
import { validateWithAuthToken } from '@/services/admin';

export const useAuth = (roles?: Role[]) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { admin, hasRoles } = useAdmin();

	useEffect(() => {
		const checkAuth = async () => {
			const token = getCookie('accessToken');
			if (token) {
				try {
					const isValid = await validateWithAuthToken();

					if (admin.data?.roles && roles) {
						const hasRequiredRole = hasRoles(roles);

						if (hasRequiredRole) {
							setIsAuthenticated(isValid);
						} else {
							setIsAuthenticated(false);
						}
					}
				} catch (error) {
					setIsAuthenticated(false);
				}
			} else {
				setIsAuthenticated(false);
			}
			setIsLoading(false);
		};

		checkAuth();
	}, [admin.data?.id]);

	return { isAuthenticated, isLoading };
};
