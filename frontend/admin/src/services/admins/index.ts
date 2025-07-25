import { Admin, Role } from '@/stores/admins';
import { CreateAdminParams, UpdateAdminParams } from './types';
import { fetchDelete, fetchGet, fetchPost, fetchPut } from '@/services/axios';

import { BACKEND } from '@/constants';

export const getAdmins = async (): Promise<Admin[]> => {
	const response = await fetchGet(BACKEND + '/admins');
	return response.data;
};

export const createAdmin = async (data: CreateAdminParams): Promise<Admin> => {
	const response = await fetchPost(BACKEND + '/admins', data);
	return response.data;
};

export const updateAdmin = async (data: UpdateAdminParams): Promise<Admin> => {
	const response = await fetchPut(BACKEND + `/admins/${data.id}`, data);
	return response.data;
};

export const deleteAdmin = async (id: string): Promise<void> => {
	await fetchDelete(`/admins/${id}`, {});
};

export const generatePassword = async (id: string): Promise<string> => {
	const response = await fetchPost(BACKEND + `/admins/${id}/generate-password`);
	return response.data.password;
};
