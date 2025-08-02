import {
	createAdminWallet,
	getAdminWallets,
	getSuperAdmins,
	getUsersWallets,
	softDeleteAdminWallet
} from '@/services/wallets';
import { useMutation, useQuery } from '@tanstack/react-query';

import { CreateAdminWalletParams } from './types';
import useAdmin from '../useAdmin';

export const useWallet = () => {
	const { admin } = useAdmin();

	const { data: superAdmins } = useQuery({
		queryKey: ['superAdmins'],
		queryFn: getSuperAdmins,
		enabled: !!admin.data?.id
	});

	const {
		data: userWallets,
		isLoading: isLoadingUserWallets,
		error: userWalletsError
	} = useQuery({
		queryKey: ['userWallets'],
		queryFn: getUsersWallets,
		enabled: !!admin.data?.id
	});

	const {
		data: adminWallets,
		isLoading: isLoadingAdminWallets,
		error: adminWalletsError,
		refetch: refetchAdminWallets
	} = useQuery({
		queryKey: ['adminWallets', admin.data?.id],
		queryFn: async () => {
			if (admin?.data?.id) {
				const response = await getAdminWallets(admin.data?.id);
				return response;
			}
		},
		enabled: !!admin.data?.id // Only run this query if adminId is available
	});

	const softDeleteAdminWalletMutation = useMutation({
		mutationKey: ['softDeleteWallet'],
		mutationFn: async (walletId: string) => {
			console.log({ walletId, adminId: admin?.data?.id });
			if (admin?.data?.id) {
				const response = await softDeleteAdminWallet(walletId);
				return response;
			}
		},
		onSuccess: () => {
			refetchAdminWallets();
		}
	});

	const createAdminWalletMutation = useMutation({
		mutationKey: ['createAdminWallet'],
		mutationFn: async (params: CreateAdminWalletParams) => {
			if (admin?.data?.id) {
				const response = await createAdminWallet(
					params.adminId,
					params.walletAddress
				);
				return response;
			}
		},
		onSuccess: () => {
			refetchAdminWallets();
		}
	});

	return {
		userWallets,
		isLoadingUserWallets,
		userWalletsError,
		adminWallets,
		isLoadingAdminWallets,
		adminWalletsError,
		softDeleteAdminWalletMutation,
		superAdmins,
		createAdminWalletMutation
	};
};
