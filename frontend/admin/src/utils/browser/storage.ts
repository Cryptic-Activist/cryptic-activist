export const isClientSide = () => {
	if (typeof window === 'undefined') return false;
	return true;
};

export const handleCopyWalletAddress = (elementId: string): void => {
	const range = document.createRange();
	range.selectNode(document.getElementById(elementId)!);
	window.getSelection()?.removeAllRanges();
	window.getSelection()?.addRange(range);
	document.execCommand('copy');
	window.getSelection()?.removeAllRanges();
};

export const copyToClipboard = (text: string): void => {
	navigator.clipboard.writeText(text);
};

export const setLocalStorage = (key: string, value: string) => {
	localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
	return localStorage.getItem(key);
};

export const removeLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const getBearerToken = (token: string) => `Bearer ${token}`;

export const getBearerToken2 = () => {
	const accessToken = getLocalStorage('accessToken');

	if (accessToken === null) {
		throw new Error('JWT not found');
	}

	return `Bearer ${accessToken}`;
};
