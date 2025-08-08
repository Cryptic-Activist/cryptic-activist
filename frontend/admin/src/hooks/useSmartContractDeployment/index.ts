'use client';

import {
	DeploymentEscrowFormData,
	DeploymentPremiumFormData,
	deploymentEscrowFormSchema,
	deploymentPremiumFormSchema
} from './zod';
import {
	deployEscrowERC20SmartContract,
	deployEscrowNativeTokenSmartContract,
	deployPremiumSmartContract,
	getAdminArbitratorWallets,
	getDeploymentStats
} from '@/services/smart-contracts';
import { useAdmin, useChains } from '..';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import type { Chain } from '@/stores/chains/types';
import type { DeploySmartContractParams } from '@/services/smart-contracts/types';
import { IS_DEVELOPMENT } from '@/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const useSmartContractDeployment = () => {
	const { admin } = useAdmin();
	const { chains } = useChains();

	const [selectedChain, setSelectedChain] = useState<Chain | null>(null);

	const {
		register: registerEscrow,
		handleSubmit: handleSubmitEscrow,
		formState: { errors: errorsEscrow },
		reset: resetEscrow,
		watch: watchEscrow
	} = useForm<DeploymentEscrowFormData>({
		resolver: zodResolver(deploymentEscrowFormSchema),
		defaultValues: {
			type: '',
			chainId: '',
			defaultFeeRate: '0.5',
			defaultProfitMargin: '2.0',
			platformWallet: ''
		}
	});

	const {
		register: registerPremium,
		handleSubmit: handleSubmitPremium,
		formState: { errors: errorsPremium },
		reset: resetPremium,
		watch: watchPremium,
		setValue: setValuePremium
	} = useForm<DeploymentPremiumFormData>({
		resolver: zodResolver(deploymentPremiumFormSchema),
		defaultValues: {
			type: '',
			chainId: '',
			monthlyPrice: '10',
			yearlyPrice: '100',
			platformWallet: ''
		}
	});

	const watchedValuesEscrow = watchEscrow();
	const watchedValuesPremium = watchPremium();

	const deploymentStats = useMutation({
		mutationKey: ['smartContractDeployment'],
		mutationFn: getDeploymentStats
	});

	const superAdminArbitratorWallets = useMutation({
		mutationKey: ['smartContractDeployment'],
		mutationFn: (adminId: string) => getAdminArbitratorWallets(adminId)
	});

	const deploymentEscrowERC20Mutation = useMutation({
		mutationKey: ['escrowERC20SmartContractDeployment'],
		mutationFn: async (params: DeploySmartContractParams) => {
			if (admin?.data?.id) {
				const response = await deployEscrowERC20SmartContract(params);
				return response;
			}
		},
		onSuccess: () => {
			if (admin?.data?.id && selectedChain?.id) {
				deploymentStats.mutate(selectedChain.id);
			}
			handleResetAllForms();
		}
	});

	const deploymentEscrowNativeTokenMutation = useMutation({
		mutationKey: ['escrowNativeTokenSmartContractDeployment'],
		mutationFn: async (params: DeploySmartContractParams) => {
			console.log(params);
			if (admin?.data?.id) {
				const response = await deployEscrowNativeTokenSmartContract(params);

				if (!response) {
					throw new Error('Unable to deploy');
				}

				return response;
			}
		},
		onSuccess: () => {
			if (admin?.data?.id && selectedChain?.id) {
				deploymentStats.mutate(selectedChain.id);
			}
			handleResetAllForms();
		},
		onError: (error) => {
			console.log({ error });
		}
	});

	const deploymentPremiumMutation = useMutation({
		mutationKey: ['premiumSmartContractDeployment'],
		mutationFn: async (params: DeploySmartContractParams) => {
			if (admin?.data?.id) {
				const response = await deployPremiumSmartContract(params);
				return response;
			}
		},
		onSuccess: () => {
			if (admin?.data?.id && selectedChain?.id) {
				deploymentStats.mutate(selectedChain.id);
			}
			handleResetAllForms();
		}
	});

	const onSubmitEscrowERC20 = async (data: DeploymentEscrowFormData) => {
		if (admin?.data?.id) {
			await deploymentEscrowERC20Mutation.mutateAsync({
				...data,
				adminId: admin?.data?.id
			});
		}
	};

	const onSubmitEscrowNativeToken = async (data: DeploymentEscrowFormData) => {
		if (admin?.data?.id) {
			await deploymentEscrowNativeTokenMutation.mutateAsync({
				...data,
				adminId: admin?.data?.id
			});
		}
	};

	const onSubmitPremium = async (data: DeploymentPremiumFormData) => {
		if (admin?.data?.id) {
			await deploymentPremiumMutation.mutateAsync({
				...data,
				adminId: admin?.data?.id
			});
		}
	};

	const handleResetEscrow = () => {
		resetEscrow();
	};

	const handleResetPremium = () => {
		resetPremium();
	};

	const handleResetAllForms = () => {
		resetEscrow();
		resetPremium();
	};

	useEffect(() => {
		if (admin?.data?.id && selectedChain?.id) {
			deploymentStats.mutate(selectedChain.id);
			superAdminArbitratorWallets.mutate(admin.data?.id);
		}
	}, [admin?.data?.id, selectedChain]);

	useEffect(() => {
		if (chains.data && chains.data.length > 0) {
			const filtered = chains.data.filter((chain) => {
				if (IS_DEVELOPMENT) {
					return chain.name === 'Hardhat';
				}
				return chain.name === 'Polygon';
			});
			setSelectedChain(filtered[0]);
		}
	}, [chains.data]);

	useEffect(() => {
		if (watchedValuesEscrow.type === 'Premium') {
			setValuePremium('type', watchedValuesEscrow.type);
		}
	}, [watchedValuesEscrow.type]);

	console.log({ superAdminArbitratorWallets });

	return {
		deploymentStats,
		handleResetAllForms,
		superAdminArbitratorWallets,
		escrow: {
			watchedValues: watchedValuesEscrow,
			errors: errorsEscrow,
			deploymentEscrowERC20Mutation,
			onSubmit:
				watchedValuesEscrow.type === 'Escrow:ERC20'
					? onSubmitEscrowERC20
					: onSubmitEscrowNativeToken,
			handleReset: handleResetEscrow,
			register: registerEscrow,
			handleSubmit: handleSubmitEscrow
		},
		premium: {
			watchedValues: watchedValuesPremium,
			errors: errorsPremium,
			deploymentPremiumMutation,
			onSubmit: onSubmitPremium,
			handleReset: handleResetPremium,
			register: registerPremium,
			handleSubmit: handleSubmitPremium
		}
	};
};

export default useSmartContractDeployment;
