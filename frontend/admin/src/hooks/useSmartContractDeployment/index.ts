import {
	DeploymentEscrowFormData,
	DeploymentPremiumFormData,
	deploymentEscrowFormSchema,
	deploymentPremiumFormSchema
} from './zod';
import {
	deployEscrowSmartContract,
	deployPremiumSmartContract,
	getDeploymentStats
} from '@/services/smart-contracts';
import { useAdmin, useChains } from '..';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Chain } from '@/stores/chains/types';
import { DeploySmartContractParams } from '@/services/smart-contracts/types';
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
			defaultFeeRate: 0.5,
			defaultProfitMargin: 2.0,
			platformWallet: ''
		}
	});

	const {
		register: registerPremium,
		handleSubmit: handleSubmitPremium,
		formState: { errors: errorsPremium },
		reset: resetPremium,
		watch: watchPremium
	} = useForm<DeploymentPremiumFormData>({
		resolver: zodResolver(deploymentPremiumFormSchema),
		defaultValues: {
			type: '',
			chainId: '',
			monthlyPrice: 10,
			yearlyPrice: 100,
			platformWallet: ''
		}
	});

	const watchedValuesEscrow = watchEscrow();
	const watchedValuesPremium = watchPremium();

	const deploymentStats = useMutation({
		mutationKey: ['smartContractDeployment'],
		mutationFn: getDeploymentStats
	});

	const deploymentEscrowMutation = useMutation({
		mutationKey: ['escrowSmartContractDeployment'],
		mutationFn: async (params: DeploySmartContractParams) => {
			if (admin?.data?.id) {
				const response = await deployEscrowSmartContract(params);
				return response;
			}
		},
		onSuccess: () => {
			if (admin?.data?.id && selectedChain?.id) {
				deploymentStats.mutate(selectedChain.id);
			}
			resetEscrow();
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
			resetPremium();
		}
	});

	const onSubmitEscrow = async (data: DeploymentEscrowFormData) => {
		if (admin?.data?.id) {
			console.log({ data });
			await deploymentEscrowMutation.mutateAsync({
				...data,
				adminId: admin?.data?.id
			});
		}
	};

	const onSubmitPremium = async (data: DeploymentPremiumFormData) => {
		if (admin?.data?.id) {
			console.log({ data });
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
		}
	}, [admin?.data?.id, selectedChain]);

	useEffect(() => {
		if (chains.data && chains.data.length > 0) {
			setSelectedChain(chains.data[0]);
		}
	}, [chains.data]);

	return {
		deploymentStats,
		handleResetAllForms,
		escrow: {
			watchedValues: watchedValuesEscrow,
			errors: errorsEscrow,
			deploymentEscrowMutation,
			onSubmit: onSubmitEscrow,
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
