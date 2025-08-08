import { useQuery } from '@tanstack/react-query';

import { getCookie } from '@/utils';
import { validateWithAuthToken } from '@/services/user';

export const useAuth = () => {
	const { data: isAuthenticated, isLoading } = useQuery({
		queryKey: ['auth'],
		queryFn: async () => {
			const token = getCookie('accessToken');
			if (token) {
				try {
					const isValid = await validateWithAuthToken();
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
