import {
	AddDisputePartyNoteBody,
	GetPreviousDisputePartyNoteParams
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
