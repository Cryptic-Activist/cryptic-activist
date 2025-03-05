import { call, put } from "redux-saga/effects";

async function getCurrentOffers(user_id: string, payment_method_type: string) {
	const res = await fetch(
		`${process.env.OFFER_API}/offers?vendor_id=${user_id}&payment_method_type=${payment_method_type}&associations=fiat,cryptocurrency`,
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
}

export default function* asyncGetCurrentOffers(action) {
	try {
		const offers = yield call(
			getCurrentOffers,
			action.payload.user_id,
			action.payload.payment_method_type
		);

		console.log("offers:", offers);

		if (offers.status_code === 200) {
			yield put({
				type: "SUCCESS_GET_CURRENT_OFFERS",
				payload: { data: offers.results },
			});
		} else {
			yield put({
				type: "FAILURE_GET_CURRENT_OFFERS",
				payload: { data: offers.errors },
			});
		}
	} catch (err) {
		console.error(err);
		yield put({
			type: "FAILURE_GET_CURRENT_OFFERS",
			payload: { data: err },
		});
	}
}
