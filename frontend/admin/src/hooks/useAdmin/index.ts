'use client';
'use client';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';

import {
	admin,
	decodeAccessToken as handleDecodeAccessToken,
	handleLoginAdmin
} from '@/stores/admin';
import { AdminRole, type CreateUserParams } from './types';

let counter: number = 0;

const useUsers = () => {
	const $admin = useStore(admin);

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

	useEffect(() => {
		const decodeAccessToken = async () => {
			await handleDecodeAccessToken();
		};

		if (counter === 0) {
			const decoded = decodeAccessToken().catch();
			counter += 1;
		}
	}, []);

	return {
		loginAdmin,
		handleDecodeAccessToken,
		admin: $admin,
		getRoles,
		hasRole,
		hasRoles
	};
};

export default useUsers;
