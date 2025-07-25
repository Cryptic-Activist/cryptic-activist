import { axiosInstance } from '@/utils/axios';
import { Admin, Role } from '@/stores/admins';

export const getAdmins = async (): Promise<Admin[]> => {
	const response = await axiosInstance.get('/admins');
	return response.data;
};

export const createAdmin = async (data: {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	roles: Role[];
}): Promise<Admin> => {
	const response = await axiosInstance.post('/admins', data);
	return response.data;
};

export const updateAdmin = async (data: {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	roles: Role[];
	active: boolean;
}): Promise<Admin> => {
	const response = await axiosInstance.put(`/admins/${data.id}`, data);
	return response.data;
};

export const deleteAdmin = async (id: string): Promise<void> => {
	await axiosInstance.delete(`/admins/${id}`);
};

export const generatePassword = async (id: string): Promise<string> => {
	const response = await axiosInstance.post(`/admins/${id}/generate-password`);
	return response.data.password;
};
