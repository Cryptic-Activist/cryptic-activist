import {
	deployEscrowSmartContract,
	getDeploymentStats
} from '@/services/smart-contracts';
import { useAdmin, useChains } from '..';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Chain } from '@/stores/chains/types';
import { DeploySmartContractParams } from '@/services/smart-contracts/types';
import type { DeploymentFormData } from './zod';
import { deploymentFormSchema } from './zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const useSmartContractDeployment = () => {
	const { admin } = useAdmin();
	const { chains } = useChains();

	const [selectedChain, setSelectedChain] = useState<Chain | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch
	} = useForm<DeploymentFormData>({
		resolver: zodResolver(deploymentFormSchema),
		defaultValues: {
			type: '',
			chainId: '',
			defaultFeeRate: 0.5,
			defaultProfitMargin: 2.0,
			platformWallet: ''
		}
	});

	const watchedValues = watch();

	const deploymentStats = useMutation({
		mutationKey: ['smartContractDeployment'],
		mutationFn: getDeploymentStats
	});

	const deploymentMutation = useMutation({
		mutationKey: ['smartContractDeployment'],
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
			reset();
		}
	});

	const onSubmit = async (data: DeploymentFormData) => {
		if (admin?.data?.id) {
			console.log({ data });
			await deploymentMutation.mutateAsync({
				...data,
				adminId: admin?.data?.id
			});
		}
	};

	const handleReset = () => {
		reset();
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
		watchedValues,
		errors,
		deploymentMutation,
		deploymentStats,
		onSubmit,
		handleReset,
		register,
		handleSubmit
	};
};

export default useSmartContractDeployment;
