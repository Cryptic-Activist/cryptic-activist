import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const getSupportedChains = async () => {
	const response = await fetchGet(
		`${BACKEND}/blockchains/wallet/supported/chains`
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
