import { call, put } from "redux-saga/effects";

const getDefaultCryptocurrency = async (symbol: string) => {
	const res = await fetch(
		`${process.env.CRYPTOCURRENCY_API}/cryptocurrency?coingecko_id=${symbol}`,
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

export default function* asyncGetDefaultCryptocurrency(action) {
	try {
		const defaultCryptocurrency = yield call(
			getDefaultCryptocurrency,
			action.payload.coingecko_id
		);

		if (defaultCryptocurrency.status_code === 200) {
			yield put({
				type: "SUCCESS_SET_DEFAULT_CRYPTOCURRENCY",
				payload: { cryptocurrency: defaultCryptocurrency.results },
			});
		} else {
			yield put({ type: "RESET_DEFAULTS" });
		}
	} catch (err) {
		yield put({ type: "RESET_DEFAULTS" });
	}
}
