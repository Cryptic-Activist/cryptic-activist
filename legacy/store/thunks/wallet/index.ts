import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	initEthereum,
	getEthereumAccount,
} from '@utils/blockchain/wallet/ethereum';

const loadEthereum = () => {
	if (!initEthereum) {
		alert('Ethereum wallet is not installed. Please install MetaMask');
	}
};

const getAccount = async () => {
	const account = await getEthereumAccount();
	return account;
};

export const getEthereumWallet = createAsyncThunk(
	'wallet/ethereum/wallet',
	async () => {
		try {
			loadEthereum();

			const address = await getAccount();

			if (typeof address === 'string') {
				if (address.length > 0) {
					return address;
				}
			} else {
				return null;
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	}
);
