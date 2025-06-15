import {
	AddDisputePartyNoteBody,
	CancelTradeByModeratorBody,
	EscalateToSeniorAdminBody,
	GetPreviousDisputePartyNoteParams,
	RequestMoreEvidencesBody,
	ResolveInTraderFavorBody,
	ResolveInVendorFavorBody,
	SubmitDisputeResolutionBody,
	SubmitDisputeUserManagementActionsBody
} from './types';
import { fetchGet, fetchPost } from '../axios';

import { BACKEND } from '@/constants';
import { getBearerToken } from '@/utils';
import { getLocalStorage } from '@/utils/browser/storage';
import { getQueries } from '@/utils/axios';

export const getDispute = async (id: string) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/disputes/dispute/${id}/admin`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const getPreviousDisputePartyNote = async (
	params: GetPreviousDisputePartyNoteParams
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const queries = getQueries(params);
	const response = await fetchGet(
		`${BACKEND}/disputes/dispute/party-note/previous/admin` + queries,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const addDisputePartyNote = async (body: AddDisputePartyNoteBody) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/disputes/dispute/party-note/admin`,
		body,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const getDisputeResolutionTypes = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		`${BACKEND}/disputes/dispute/resolution/types/admin`,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const submitDisputeResolution = async (
	params: SubmitDisputeResolutionBody
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/disputes/dispute/resolution/add/admin`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const getDisputeUserManagementActions = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		`${BACKEND}/disputes/dispute/user-management/actions/admin`,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const submitDisputeUserManagementActions = async (
	params: SubmitDisputeUserManagementActionsBody
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/disputes/dispute/user-management/trigger/actions/admin`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const submitResolveInTraderFavor = async (
	params: ResolveInTraderFavorBody
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/disputes/dispute/resolution/favor/trader/admin`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const submitResolveInVendorFavor = async (
	params: ResolveInVendorFavorBody
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/disputes/dispute/resolution/favor/vendor/admin`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const submitCancelTradeByModerator = async (
	params: CancelTradeByModeratorBody
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/disputes/dispute/resolution/trade/cancel/admin`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const submitEscalateToSeniorAdmin = async (
	params: EscalateToSeniorAdminBody
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/disputes/dispute/quick-actions/escalate/admin`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const submitRequestMoreEvidences = async (
	params: RequestMoreEvidencesBody
) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/disputes/dispute/quick-actions/request-more-evidences/admin`,
		params,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
