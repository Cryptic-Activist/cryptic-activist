import { call, put } from "redux-saga/effects";

async function getVendor(username) {
	const res = await fetch(
		// `${process.env.USER_API}/user/get?username=${username}`,
		`${process.env.USER_API}/user/get?username=${username}&associations=languages,profile_image`,
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

export default function* asyncGetVendor(action) {
	try {
		const vendor = yield call(getVendor, action.payload.username);

		if (vendor.status_code === 200) {
			yield put({
				type: "SUCCESS_GET_VENDOR",
				payload: { data: vendor.results },
			});
		} else {
			yield put({
				type: "FAILURE_GET_VENDOR",
				payload: { data: vendor.errors },
			});
		}
	} catch (err) {
		console.error(err);
		yield put({
			type: "FAILURE_GET_VENDOR",
			payload: { data: err },
		});
	}
}
