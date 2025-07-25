import { axiosInstance } from '@/utils/axios';

export const getRandomCredentials = async (): Promise<{ firstName: string; lastName: string; username: string }> => {
	const response = await axiosInstance.get('/users/random/credentials');
	return response.data;
};
