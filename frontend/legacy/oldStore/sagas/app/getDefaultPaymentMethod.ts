import { call, put } from "redux-saga/effects";

const getDefaultPaymentMethod = async (payment_method_id: string) => {
	const res = await fetch(
		`${process.env.OFFER_API}/payment-method?associations=payment_method_category&id=${payment_method_id}`,
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

export default function* asyncGetDefaultPaymentMethod(action) {
	try {
		const defaults = yield call(
			getDefaultPaymentMethod,
			action.payload.payment_method_id
		);

		console.log("defaults:", defaults);

		if (defaults.status_code === 200) {
			yield put({
				type: "SUCCESS_SET_DEFAULT_PAYMENT_METHOD",
				payload: { payment_method: defaults.results },
			});
		} else {
			yield put({ type: "RESET_DEFAULTS" });
		}
	} catch (err) {
		console.log("err:", err);
		yield put({ type: "RESET_DEFAULTS" });
	}
}
