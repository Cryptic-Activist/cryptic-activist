import { Admin, Role } from '@/stores/admins';
import { CreateAdminParams, UpdateAdminParams } from './types';
import { fetchDelete, fetchGet, fetchPost, fetchPut } from '@/services/axios';
import { getBearerToken2, getLocalStorage } from '@/utils/browser/storage';

import { BACKEND } from '@/constants';

export const getAdmins = async (): Promise<Admin[] | null> => {
	const bearerToken = getBearerToken2();

	if (!bearerToken) {
		return null;
	}

	const response = await fetchGet(BACKEND + '/admins/all', {
		Authorization: bearerToken
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const createAdmin = async (
	data: CreateAdminParams
): Promise<Admin | null> => {
	const bearerToken = getBearerToken2();

	if (!bearerToken) {
		return null;
	}

	const response = await fetchPost(BACKEND + '/admins/auth/invite', data, {
		Authorization: bearerToken
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const updateAdmin = async (
	data: UpdateAdminParams
): Promise<Admin | null> => {
	const bearerToken = getBearerToken2();

	if (!bearerToken) {
		return null;
	}

	const response = await fetchPut(BACKEND + `/admins/${data.id}`, data, {
		Authorization: bearerToken
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const deleteAdmin = async (id: string): Promise<void | null> => {
	const bearerToken = getBearerToken2();

	if (!bearerToken) {
		return null;
	}

	await fetchDelete(`/admins/${id}`, {
		Authorization: bearerToken
	});
};

export const generatePassword = async (id: string): Promise<string | null> => {
	const bearerToken = getBearerToken2();

	if (!bearerToken) {
		return null;
	}

	const response = await fetchGet(BACKEND + `/admins/${id}/generate-password`, {
		Authorization: bearerToken
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
