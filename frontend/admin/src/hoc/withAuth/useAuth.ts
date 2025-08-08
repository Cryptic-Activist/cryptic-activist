import { useQuery } from '@tanstack/react-query';

import { AdminRole } from '@/stores/admin/types';
import { Role } from '@/stores/admins';
import { getCookie } from '@/utils';
import { useAdmin } from '@/hooks';
import { validateWithAuthToken } from '@/services/admin';

export const useAuth = (roles?: Role[]) => {
	const { admin, hasRoles } = useAdmin();

	const { data: isAuthenticated, isLoading } = useQuery({
		queryKey: ['auth', admin.data?.id],
		queryFn: async () => {
			const token = getCookie('accessToken');
			if (token) {
				try {
					const isValid = await validateWithAuthToken();

					if (admin.data?.roles && roles) {
						const hasRequiredRole = hasRoles(roles);
						return hasRequiredRole && isValid;
					}
					return isValid;
				} catch (error) {
					return false;
				}
			}
			return false;
		},
		refetchOnWindowFocus: false
	});

	return { isAuthenticated, isLoading };
};
