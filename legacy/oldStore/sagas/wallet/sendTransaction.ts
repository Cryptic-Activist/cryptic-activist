import { call, put } from "redux-saga/effects";
import { sendTransaction } from "@utils/blockchain/wallet/ethereum";

async function sendTransactionFunc(to: string, amount: string) {
	await sendTransaction(to, amount);
}

export default function* asyncSetWallet(action) {
	try {
		yield call(sendTransactionFunc, action.payload.to, action.payload.amount);
	} catch (err) {
		// yield put({
		// 	type: "FAILURE_SET_WALLET",
		// 	payload: { data: [err] },
		// });
	}
}
