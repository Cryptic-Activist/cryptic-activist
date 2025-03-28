import Web3 from 'web3';

import detectEthereumProvider from '@metamask/detect-provider';

export const initEthereum = async (): Promise<boolean> => {
	let provider = await detectEthereumProvider();

	if (!provider) return false;

	return true;
};

export const getEthereumAccount = async () => {
	if (!window.ethereum) {
		return null;
	}

	// @ts-ignore
	const web3 = new Web3(window.ethereum);
	const accountsRequest = await web3.eth.requestAccounts();

	return accountsRequest[0];
};

export const sendTransaction = async (to: string, amount: string) => {
	try {
		const { ethereum } = window;

		const transactionParameters = {
			nonce: '0x00', // ignored by MetaMask
			gasPrice: '0x10184e72a000', // customizable by user during MetaMask confirmation.
			gas: '0x27150', // customizable by user during MetaMask confirmation.
			// to: "0xBFaE7390380242909a4FD2479d056C63B50Cd79C",
			to,
			// @ts-ignore
			from: ethereum.selectedAddress,
			// value: "0x29a2241af62c0000",
			value: amount,
			data:
				'0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
			// @ts-ignore
			chainId: ethereum.chainId,
		};

		// @ts-ignore
		const txHash = await ethereum.request({
			method: 'eth_sendTransaction',
			params: [transactionParameters],
		});

		return txHash;
	} catch (error) {
		console.log(error);
	}
};
