'use client';

import {
	AddDisputePartyNoteBody,
	CancelTradeByModeratorBody,
	ResolveInTraderFavorBody,
	ResolveInVendorFavorBody,
	SubmitDisputeResolutionBody,
	SubmitDisputeUserManagementActionsBody
} from '@/services/dispute/types';
import {
	addDisputePartyNote,
	getDispute,
	getDisputeResolutionTypes,
	getDisputeUserManagementActions,
	getPreviousDisputePartyNote,
	submitCancelTradeByModerator,
	submitDisputeResolution,
	submitDisputeUserManagementActions,
	submitEscalateToSeniorAdmin,
	submitRequestMoreEvidences,
	submitResolveInTraderFavor,
	submitResolveInVendorFavor
} from '@/services/dispute';
import { dispute, resetDispute, setDispute } from '@/stores';
import {
	disputeNotesResolver,
	disputeResolutionResolver,
	disputeUserManagementResolver
} from './zod';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { PreviousDisputePartyNotes } from './types';
import { useAdmin } from '..';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useStore } from '@nanostores/react';

const useDispute = () => {
	const params = useParams();
	const id = params?.id as string;

	const { admin } = useAdmin();
	const $dispute = useStore(dispute);
	const [previousDisputePartyNotes, setPreviousDisputePartyNotes] =
		useState<PreviousDisputePartyNotes>();

	const seniorOrSuperAdminFiltered = admin?.data?.roles?.filter(
		(role) => role.role === 'SENIOR_ADMIN' || role.role === 'SUPER_ADMIN'
	);
	const isSeniorOrSuperAdmin = seniorOrSuperAdminFiltered
		? seniorOrSuperAdminFiltered.length > 0
		: false;

	console.log({ isSeniorOrSuperAdmin, admin: admin.data });

	const {
		register: registerDisputeNotes,
		handleSubmit: handleSubmitDisputeNotes,
		getValues: getValuesDisputeNotes,
		setValue: setValuesDisputeNotes
	} = useForm({
		resolver: disputeNotesResolver
	});
	const {
		register: registerResolution,
		handleSubmit: handleSubmitResolution,
		getValues: getValuesResolution,
		setValue: setValuesResolution
	} = useForm({
		resolver: disputeResolutionResolver
	});
	const {
		register: registerUserManagement,
		handleSubmit: handleSubmitUserManagement,
		getValues: getValuesUserManagement,
		setValue: setValuesUserManagement
	} = useForm({
		resolver: disputeUserManagementResolver
	});

	const disputeQuery = useQuery({
		queryKey: ['dispute', id],
		queryFn: async () => {
			if (id) {
				const response = await getDispute(id);
				return response;
			}
		},
		enabled: !!admin.data?.id,
		refetchOnMount: 'always',
		staleTime: 0,
		refetchOnWindowFocus: true
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
			return response;
		},
		enabled:
			!!disputeQuery.data?.trade?.trader?.id &&
			!!disputeQuery.data?.trade?.vendor?.id,
		staleTime: 0,
		refetchOnWindowFocus: true
	});

	const addDisputePartyNoteMutation = useMutation({
		mutationKey: ['addDisputePartyNote'],
		mutationFn: async (params: AddDisputePartyNoteBody) =>
			addDisputePartyNote(params),
		onSuccess: () => {
			setValuesDisputeNotes('content', '');
			setValuesDisputeNotes('userId', '');
			previousDisputePartyNoteQuery.refetch();
		}
	});

	const resolutionMutation = useMutation({
		mutationKey: ['resolution'],
		mutationFn: async (params: SubmitDisputeResolutionBody) =>
			submitDisputeResolution(params),
		onSuccess: () => {
			setValuesResolution('logAdminAction', false);
			setValuesResolution('notifyBothUsers', false);
			setValuesResolution('resolutionNote', '');
			setValuesResolution('resolutionType', '');
			resolutionTypesQuery.refetch();
		}
	});

	const userManagementActiosMutation = useMutation({
		mutationKey: ['userManagementActions'],
		mutationFn: async (params: SubmitDisputeUserManagementActionsBody) => {
			if ($dispute.id && admin?.data?.id) {
				const response = await submitDisputeUserManagementActions(params);
				return response;
			}
		},
		onSuccess: () => {
			setValuesUserManagement('actionForTrader', 'NO_ACTION');
			setValuesUserManagement('actionForVendor', 'NO_ACTION');
			userManagementActionsQuery.refetch();
		}
	});

	const resolveInTraderFavorMutation = useMutation({
		mutationKey: ['resolveInTraderFavor'],
		mutationFn: async () => {
			if ($dispute.id && admin?.data?.id) {
				const response = await submitResolveInTraderFavor({
					disputeId: $dispute.id,
					moderatorId: admin?.data?.id
				});
				return response;
			}
		},
		onSuccess: () => {
			disputeQuery.refetch();
		}
	});

	const resolveInVendorFavorMutation = useMutation({
		mutationKey: ['resolveInVendorFavor'],
		mutationFn: async () => {
			if ($dispute.id && admin?.data?.id) {
				const submitted = await submitResolveInVendorFavor({
					disputeId: $dispute.id,
					moderatorId: admin?.data?.id
				});
				return submitted;
			}
		},
		onSuccess: () => {
			disputeQuery.refetch();
		}
	});

	const cancelTradeByModeratorMutation = useMutation({
		mutationKey: ['cancelTradeByModerator'],
		mutationFn: async () => {
			if ($dispute.id && admin?.data?.id) {
				const submitted = await submitCancelTradeByModerator({
					disputeId: $dispute.id,
					moderatorId: admin?.data?.id
				});
				return submitted;
			}
		},
		onSuccess: () => {
			disputeQuery.refetch();
		}
	});

	const requestMoreEvidencesMutation = useMutation({
		mutationKey: ['requestMoreEvidences'],
		mutationFn: async () => {
			if ($dispute.id && admin?.data?.id) {
				const submitted = await submitRequestMoreEvidences({
					disputeId: $dispute.id,
					moderatorId: admin?.data?.id
				});
				return submitted;
			}
		},
		onSuccess: (data: any) => {
			console.log({ data });
		}
	});

	const escalateToSeniorAdminMutation = useMutation({
		mutationKey: ['escalateToSeniorAdmin'],
		mutationFn: async () => {
			if ($dispute.id && admin?.data?.id) {
				const submitted = await submitEscalateToSeniorAdmin({
					disputeId: $dispute.id,
					moderatorId: admin?.data?.id
				});
				return submitted;
			}
		},
		onSuccess: (data: any) => {
			disputeQuery.refetch();
		}
	});

	const onSubmitDisputeNotes = async (data: any) => {
		addDisputePartyNoteMutation.mutate({
			...data,
			disputeId: $dispute.id,
			adminId: admin.data?.id
		});
	};

	const onSubmitResolutionNotes = async (data: any) => {
		resolutionMutation.mutate({ ...data, disputeId: $dispute.id });
	};

	const onSubmitUserManagement = async (data: any) => {
		userManagementActiosMutation.mutate({
			...data,
			disputeId: $dispute.id,
			moderatorId: admin?.data?.id
		});
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

	useEffect(() => {
		return () => {
			resetDispute();
		};
	}, []);

	return {
		admin,
		$dispute,
		previousDisputePartyNotes,
		resolutionTypesQuery,
		userManagementActionsQuery,
		registerResolution,
		registerUserManagement,
		handleSubmitResolution,
		handleSubmitUserManagement,
		registerDisputeNotes,
		handleSubmitDisputeNotes,
		onSubmitDisputeNotes,
		onSubmitResolutionNotes,
		onSubmitUserManagement,
		resolveInVendorFavorMutation,
		resolveInTraderFavorMutation,
		cancelTradeByModeratorMutation,
		requestMoreEvidencesMutation,
		escalateToSeniorAdminMutation,
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
		},
		isSeniorOrSuperAdmin
	};
};

export default useDispute;
