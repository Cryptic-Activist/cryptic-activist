import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';
import { getBearerToken2 } from '@/utils/browser/storage';

export const validateWithAuthToken = async () => {
	try {
		const bearerToken = getBearerToken2();
		const response = await fetchGet(`${BACKEND}/admins/auth/validate/token`, {
			Authorization: bearerToken
		});

		if (response.status !== 200) return false;

		return response.data.isValid;
	} catch (_err) {
		return false;
	}
};
