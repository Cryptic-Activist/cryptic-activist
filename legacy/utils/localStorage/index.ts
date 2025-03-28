import { getLocalStorage } from '@utils/browser';

export const storageCreateOffer = (offerObj) => {
	localStorage.setItem('offerCreation', JSON.stringify(offerObj));
};

export const getAuthToken = () => {
	const token = getLocalStorage('accessToken');

	return `Bearer ${token}`;
};
