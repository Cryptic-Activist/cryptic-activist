import { call, put } from "redux-saga/effects";

const getDefaultFiat = async (symbol: string) => {
	const res = await fetch(
		`${process.env.FIAT_API}/fiat?fiatSymbol=${symbol}`,
		{
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	const data = await res.json();
	return data;
};

export default function* asyncGetDefaultFiat(action) {
	try {
		console.log("defaults:");
		const defaults = yield call(getDefaultFiat, action.payload.symbol);

		// console.log("defaults:", defaults);

		if (defaults.status_code === 200) {
			yield put({
				type: "SUCCESS_SET_DEFAULT_FIAT",
				payload: { fiat: defaults.results },
			});
		} else {
			yield put({ type: "RESET_DEFAULTS" });
		}
	} catch (err) {
		console.log("err:", err);
		yield put({ type: "RESET_DEFAULTS" });
	}
}
