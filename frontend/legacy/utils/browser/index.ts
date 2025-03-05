export const isClientSide = () => typeof window === 'undefined';

export const handleCopyWalletAddress = (): void => {
	const range = document.createRange();
	range.selectNode(document.getElementById('walletAddress'));
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
};

export const copyToClipboard = (text: string) =>
	navigator.clipboard.writeText(text);

export const setLocalStorage = (key: string, value: string) =>
	localStorage.setItem(key, value);

export const getLocalStorage = (key: string) => localStorage.getItem(key);

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export const getCurrentPath = () => {
	return window.location.href;
};
