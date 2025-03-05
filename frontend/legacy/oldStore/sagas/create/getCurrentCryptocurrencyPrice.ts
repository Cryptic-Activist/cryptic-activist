import { call, put } from "redux-saga/effects";

const getCurrentCryptocurrencyPrice = async (
	coingecko_id: string,
	fiatSymbol: string
) => {
	const res = await fetch(
		`${process.env.CRYPTOCURRENCY_API}/cryptocurrency/price?id=${coingecko_id}&fiatSymbol=${fiatSymbol}`,
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

export default function* asyncGetCurrentCryptocurrencyPrice(action) {
	try {
		const price = yield call(
			getCurrentCryptocurrencyPrice,
			action.payload.coingecko_id,
			action.payload.fiatSymbol
		);

		if (price.status_code === 200) {
			yield put({
				type: "SUCCESS_SET_CURRENT_CRYPTOCURRENCY_PRICE",
				payload: { data: Object.values(Object.values(price.results)[0])[0] },
			});
		} else {
			yield put({
				type: "FAILURE_SET_CURRENT_CRYPTOCURRENCY_PRICE",
				payload: { data: 0 },
			});
		}
	} catch (err) {
		console.error(err);
		yield put({
			type: "FAILURE_SET_CURRENT_CRYPTOCURRENCY_PRICE",
			payload: { data: 0 },
		});
	}
}
