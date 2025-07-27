import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const getRandomCredentials = async (): Promise<{
	username: string;
	names: string[];
}> => {
	const response = await fetchGet(BACKEND + '/users/random/credentials');
	return response.data;
};
