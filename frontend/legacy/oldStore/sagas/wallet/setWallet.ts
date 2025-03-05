import { call, put } from "redux-saga/effects";
import {
	initEthereum,
	getEthereumAccount,
} from "@utils/blockchain/wallet/ethereum";

async function loadEthereum() {
	if (!initEthereum) {
		alert("Ethereum wallet is not installed. Please install MetaMask");
	}
}

async function getAccount() {
	const account = await getEthereumAccount();

	return account;
}

export default function* asyncSetWallet() {
	try {
		yield call(loadEthereum);

		const address = yield call(getAccount);

		if (typeof address === "string") {
			if (address.length > 0) {
				yield put({
					type: "SUCCESS_SET_WALLET",
					payload: { data: { address } },
				});
			}
		} else {
			yield put({
				type: "FAILURE_SET_WALLET",
				payload: { data: ["Invalid wallet"] },
			});
		}
	} catch (err) {
		yield put({
			type: "FAILURE_SET_WALLET",
			payload: { data: [err] },
		});
	}
}
