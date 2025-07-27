import { Role, admins, setAdmins } from '@/stores/admins';
import {
	createAdmin,
	deleteAdmin,
	generatePassword,
	getAdmins,
	toggleAdminActivation,
	updateAdmin
} from '@/services/admins';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { SelectedAdmin } from '@/app/admins/types';
import { adminResolver } from '@/app/admins/zod';
import { getRandomCredentials } from '@/services/users';
import { useAdmin } from '..';
import { useForm } from 'react-hook-form';
import { useStore } from '@nanostores/react';

const useAdmins = () => {
	const { admin } = useAdmin();
	const $admins = useStore(admins);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: adminResolver
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<'create' | 'edit'>('create');
	const [selectedAdmin, setSelectedAdmin] = useState<SelectedAdmin | null>(
		null
	);

	const onSubmit = async (data: any) => {
		if (selectedAdmin) {
			updateAdminMutation.mutate({
				...data,
				id: selectedAdmin.id
			});
		} else {
			await createAdminMutation.mutateAsync(data);
		}
		adminsQuery.refetch();
		closeModal();
	};

	const openModal = (admin: SelectedAdmin | null = null) => {
		setSelectedAdmin(admin);
		if (admin) {
			setModalType('edit');
			reset(admin);
		} else {
			setModalType('create');
			reset({
				firstName: '',
				lastName: '',
				username: '',
				email: '',
				roles: []
			});
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedAdmin(null);
		reset({
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			roles: []
		});
	};

	const handleGenerateCredentials = async () => {
		const credentials = await getRandomCredentialsMutation.mutateAsync();
		setValue('firstName', credentials.names[0]);
		setValue('lastName', credentials.names[1]);
		setValue('username', credentials.username);
	};

	const roles: Role[] = [
		'AUDITOR',
		'DISPUTE_MANAGER',
		'FINANCE_MANAGER',
		'KYC_REVIEWER',
		'MODERATOR',
		'SENIOR_ADMIN',
		'SUPPORT_AGENT'
	];

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
		toggleAdminActivationMutation,
		roles,
		isModalOpen,
		modalType,
		selectedAdmin,
		onSubmit,
		openModal,
		handleGenerateCredentials,
		closeModal,
		forms: {
			register,
			handleSubmit,
			setValue,
			reset,
			errors
		}
	};
};

export default useAdmins;
