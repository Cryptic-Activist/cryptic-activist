import { call, put } from "redux-saga/effects";

async function getFiats() {
	const res = await fetch(`${process.env.FIAT_API}/fiats`, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return data;
}

export default function* asyncGetFiats() {
	try {
		const fiats = yield call(getFiats);

		if (fiats.status_code === 200) {
			yield put({
				type: "SUCCESS_GET_FIATS",
				payload: { data: fiats.results },
			});
		} else {
			yield put({
				type: "FAILURE_GET_FIATS",
				payload: { data: fiats.errors },
			});
		}
	} catch (err) {
		console.error(err);
		yield put({
			type: "FAILURE_GET_FIATS",
			payload: { data: err },
		});
	}
}
