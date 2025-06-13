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
	const { admin } = useAdmin();
	const $dispute = useStore(dispute);
	const params = useParams();
	const [previousDisputePartyNotes, setPreviousDisputePartyNotes] =
		useState<PreviousDisputePartyNotes>();

	const id = params?.id as string;

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
		queryKey: ['dispute'],
		queryFn: async () => {
			if (id) {
				const response = await getDispute(id);
				return response;
			}
		},
		enabled: !!admin.data?.id
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
			!!disputeQuery.data?.trade?.vendor?.id
	});

	const addDisputePartyNoteMutation = useMutation({
		mutationKey: ['addDisputePartyNote'],
		mutationFn: async (params: AddDisputePartyNoteBody) =>
			addDisputePartyNote(params),
		onSuccess: (data: any) => {
			console.log({ data });
			setValuesDisputeNotes('content', '');
			setValuesDisputeNotes('userId', '');
			setPreviousDisputePartyNotes((prev) => {
				if ($dispute.trade?.vendor?.id === data.targetUserId) {
					return {
						vendor: {
							username: $dispute.trade?.vendor?.username,
							content: data.content
						},
						trader: prev?.trader
					};
				}
				if ($dispute.trade?.trader?.id === data.targetUserId) {
					return {
						trader: {
							username: $dispute.trade?.trader?.username,
							content: data.content
						},
						vendor: prev?.vendor
					};
				}
				return prev;
			});
		}
	});

	const resolutionMutation = useMutation({
		mutationKey: ['resolution'],
		mutationFn: async (params: SubmitDisputeResolutionBody) =>
			submitDisputeResolution(params),
		onSuccess: (data: any) => {
			setValuesResolution('logAdminAction', false);
			setValuesResolution('notifyBothUsers', false);
			setValuesResolution('resolutionNote', '');
			setValuesResolution('resolutionType', '');
			setDispute({
				resolutionNote: data.resolutionNote,
				resolutionType: data.resolutionType
			});
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
		onSuccess: (data: any) => {
			console.log({ data });
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
		onSuccess: (data: any) => {
			setDispute({
				resolvedAt: data.resolvedAt
			});
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
		onSuccess: (data: any) => {
			setDispute({
				resolvedAt: data.resolvedAt
			});
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
		onSuccess: (data: any) => {
			console.log({ data });
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
			console.log({ data });
		}
	});

	const onSubmitDisputeNotes = async (data: any) => {
		console.log({ data });
		addDisputePartyNoteMutation.mutate({
			...data,
			disputeId: $dispute.id,
			adminId: admin.data?.id
		});
	};

	const onSubmitResolutionNotes = async (data: any) => {
		console.log({ data });
		resolutionMutation.mutate({ ...data, disputeId: $dispute.id });
	};

	const onSubmitUserManagement = async (data: any) => {
		console.log({ data });
		userManagementActiosMutation.mutate(data);
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
		}
	};
};

export default useDispute;
