import { useMutation, useQuery } from '@tanstack/react-query';
import { useStore } from '@nanostores/react';
import { admins, setAdmins } from '@/stores/admins';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin, generatePassword } from '@/services/admins';
import { getRandomCredentials } from '@/services/users';
import { useEffect } from 'react';

const useAdmins = () => {
	const $admins = useStore(admins);

	const adminsQuery = useQuery({
		queryKey: ['admins'],
		queryFn: getAdmins
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
		getRandomCredentialsMutation
	};
};

export default useAdmins;
