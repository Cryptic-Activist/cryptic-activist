import { admins, setAdmins } from '@/stores/admins';
import {
	createAdmin,
	deleteAdmin,
	generatePassword,
	getAdmins,
	toggleAdminActivation,
	updateAdmin
} from '@/services/admins';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getRandomCredentials } from '@/services/users';
import { useAdmin } from '..';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

const useAdmins = () => {
	const { admin } = useAdmin();
	const $admins = useStore(admins);

	const adminsQuery = useQuery({
		queryKey: ['admins'],
		queryFn: async () => {
			if (admin?.data?.id) {
				const allAdmins = await getAdmins(admin?.data?.id);
				return allAdmins;
			}
		},
		enabled: !!admin.data?.id
	});

	const createAdminMutation = useMutation({
		mutationKey: ['createAdmin'],
		mutationFn: createAdmin,
		onSuccess: () => {
			adminsQuery.refetch();
		}
	});

	const updateAdminMutation = useMutation({
		mutationKey: ['updateAdmin'],
		mutationFn: updateAdmin,
		onSuccess: () => {
			adminsQuery.refetch();
		}
	});

	const toggleAdminActivationMutation = useMutation({
		mutationKey: ['toggleAdminActivation'],
		mutationFn: toggleAdminActivation,
		onSuccess: () => {
			adminsQuery.refetch();
		}
	});

	const deleteAdminMutation = useMutation({
		mutationKey: ['deleteAdmin'],
		mutationFn: deleteAdmin,
		onSuccess: () => {
			adminsQuery.refetch();
		}
	});

	const generatePasswordMutation = useMutation({
		mutationKey: ['generatePassword'],
		mutationFn: generatePassword
	});

	const getRandomCredentialsMutation = useMutation({
		mutationKey: ['getRandomCredentials'],
		mutationFn: getRandomCredentials
	});

	useEffect(() => {
		if (adminsQuery.data) {
			setAdmins(adminsQuery.data);
		}
	}, [adminsQuery.data]);

	return {
		admins: $admins.admins,
		adminsQuery,
		createAdminMutation,
		updateAdminMutation,
		deleteAdminMutation,
		generatePasswordMutation,
		getRandomCredentialsMutation,
		toggleAdminActivationMutation
	};
};

export default useAdmins;
