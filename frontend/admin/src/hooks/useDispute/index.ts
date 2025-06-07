'use client';

import { dispute, setDispute } from '@/stores';
import {
	disputeResolutionResolver,
	disputeUserManagementResolver
} from './zod';
import {
	getAverageTradeCompletionTime,
	getTotalActiveTrades,
	getTotalCompletedTradesToday,
	getTotalDisputedTrades,
	getTotalTradeVolume
} from '@/services/dashboard';
import { getDisputes, getFilter } from '@/services/disputes';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import { getDispute } from '@/services/dispute';
import { resolveViewport } from 'next/dist/lib/metadata/resolve-metadata';
import { useAdmin } from '..';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useStore } from '@nanostores/react';

const useDispute = () => {
	const { admin } = useAdmin();
	const $dispute = useStore(dispute);
	const params = useParams();

	// `params` is an object like: { id: 'abc123' }
	const id = params?.id as string;

	const { register: registerResolution, handleSubmit: handleSubmitResolution } =
		useForm({
			resolver: disputeResolutionResolver
		});
	const {
		register: registerUserManagement,
		handleSubmit: handleSubmitUserManagement
	} = useForm({
		resolver: disputeUserManagementResolver
	});

	const disputeQuery = useQuery({
		queryKey: ['dispute'],
		queryFn: async () => {
			if (id) {
				const response = await getDispute(id);
				return response;
			}
		},
		enabled: !!admin.data?.id
	});

	useEffect(() => {
		if (disputeQuery.data) {
			setDispute(disputeQuery.data);
		}
	}, [disputeQuery.data]);

	return {
		$dispute,
		registerResolution,
		registerUserManagement,
		handleSubmitResolution,
		handleSubmitUserManagement
	};
};

export default useDispute;
