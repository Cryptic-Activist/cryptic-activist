'use client';
'use client';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';

import {
	admin,
	decodeAccessToken,
	decodeAccessToken as handleDecodeAccessToken,
	handleLoginAdmin,
	logout,
	setAdmin
} from '@/stores/admin';
import { AdminRole, type CreateUserParams } from './types';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
	const $admin = useStore(admin);

	const query = useQuery({
		queryKey: ['login'],
		queryFn: async () => {
			const decoded = await decodeAccessToken();
			console.log({ decoded });
			if (decoded) {
				setAdmin(decoded);
				return $admin.data;
			}
			return null;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	});

	const loginAdmin = async (data: CreateUserParams) => {
		const hasLoggedIn = await handleLoginAdmin(data);
		return hasLoggedIn;
	};

	const getRoles = () => {
		const roles = $admin?.data?.roles?.map((role) => role.role);
		return roles;
	};

	const hasRole = (role: AdminRole) => {
		const found = $admin?.data?.roles?.filter((r) => r.role === role);

		if (!found) return false;

		return found?.length > 0;
	};

	const hasRoles = (roles: AdminRole[]) => {
		const found = $admin?.data?.roles?.filter((userRole) => {
			return roles.find((role) => userRole.role === role);
		});

		if (!found) return false;

		return found?.length > 0;
	};

	const handleLogOut = () => {
		logout();
	};

	return {
		loginAdmin,
		handleDecodeAccessToken,
		admin: $admin,
		getRoles,
		hasRole,
		hasRoles,
		handleLogOut,
		query
	};
};

export default useAdmin;
