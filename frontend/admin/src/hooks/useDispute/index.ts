'use client';

import { PreviousDisputePartyNotes, ResolutionType } from './types';
import {
	addDisputePartyNote,
	getDispute,
	getDisputeResolutionTypes,
	getDisputeUserManagementActions,
	getPreviousDisputePartyNote
} from '@/services/dispute';
import { dispute, setDispute } from '@/stores';
import {
	disputeNotesResolver,
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
import { useEffect, useState } from 'react';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import { AddDisputePartyNoteBody } from '@/services/dispute/types';
import { resolveViewport } from 'next/dist/lib/metadata/resolve-metadata';
import { useAdmin } from '..';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useStore } from '@nanostores/react';

const useDispute = () => {
	const { admin } = useAdmin();
	const $dispute = useStore(dispute);
	const params = useParams();
	const [previousDisputePartyNotes, setPreviousDisputePartyNotes] =
		useState<PreviousDisputePartyNotes>();

	// `params` is an object like: { id: 'abc123' }
	const id = params?.id as string;

	const {
		register: registerDisputeNotes,
		handleSubmit: handleSubmitDisputeNotes,
		getValues: getValuesDisputeNotes
	} = useForm({
		resolver: disputeNotesResolver
	});
	const {
		register: registerResolution,
		handleSubmit: handleSubmitResolution,
		getValues: getValuesResolution
	} = useForm({
		resolver: disputeResolutionResolver
	});
	const {
		register: registerUserManagement,
		handleSubmit: handleSubmitUserManagement,
		getValues: getValuesUserManagement
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

	const previousDisputePartyNoteQuery = useQuery({
		queryKey: [
			'previousDisputePartyNote',
			disputeQuery.data?.trade?.trader?.id,
			disputeQuery.data?.trade?.vendor?.id
		],
		queryFn: async ({ queryKey }) => {
			const [, traderId, vendorId] = queryKey as [string, string, string];
			if (!traderId || !vendorId) return;
			const response = await getPreviousDisputePartyNote({
				traderId,
				vendorId
			});
			console.log({ response });
			return response;
		},
		enabled:
			!!disputeQuery.data?.trade?.trader?.id &&
			!!disputeQuery.data?.trade?.vendor?.id
	});

	const addDisputePartyNoteMutation = useMutation({
		mutationKey: ['addDisputePartyNote'],
		mutationFn: async (params: AddDisputePartyNoteBody) =>
			addDisputePartyNote(params),
		onSuccess: (data: any) => {
			console.log({ data });
		}
	});

	const resolutionTypesQuery = useQuery({
		queryKey: ['resolutionTypes'],
		queryFn: getDisputeResolutionTypes,
		enabled: !!$dispute.id
	});

	const userManagementActionsQuery = useQuery({
		queryKey: ['userManagementActions'],
		queryFn: getDisputeUserManagementActions,
		enabled: !!$dispute.id
	});

	const onSubmitDisputeNotes = async (data: any) => {
		console.log({ data });
	};

	const onSubmitResolutionNotes = async (data: any) => {
		console.log({ data });
	};

	useEffect(() => {
		if (disputeQuery.data) {
			setDispute(disputeQuery.data);
		}
	}, [disputeQuery.data]);

	useEffect(() => {
		if (previousDisputePartyNoteQuery.data) {
			setPreviousDisputePartyNotes(previousDisputePartyNoteQuery.data);
		}
	}, [previousDisputePartyNoteQuery.data]);

	console.log({ dataTest: resolutionTypesQuery.data });

	return {
		$dispute,
		previousDisputePartyNotes,
		resolutionTypesQuery,
		userManagementActionsQuery,
		addDisputePartyNoteMutation,
		registerResolution,
		registerUserManagement,
		handleSubmitResolution,
		handleSubmitUserManagement,
		registerDisputeNotes,
		handleSubmitDisputeNotes,
		onSubmitDisputeNotes,
		onSubmitResolutionNotes,
		disputeNotesValues: {
			content: getValuesDisputeNotes('content'),
			userId: getValuesDisputeNotes('userId')
		},
		resolutionNotesValues: {
			resolutionType: getValuesResolution('resolutionType'),
			resolutionNote: getValuesResolution('resolutionNote'),
			logAdminAction: getValuesResolution('logAdminAction'),
			notifyBothUsers: getValuesResolution('notifyBothUsers')
		},
		userManagementValues: {
			actionForTrader: getValuesUserManagement('actionForTrader'),
			actionForVendor: getValuesUserManagement('actionForVendor')
		}
	};
};

export default useDispute;
