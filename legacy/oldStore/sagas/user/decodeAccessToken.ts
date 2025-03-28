import { call, put } from "redux-saga/effects";

async function getUserInfoFromToken(token: string) {
	console.log(`Bearer ${token}`);
	const res = await fetch(
		`${process.env.USER_API}/user/auth/login/decode/token/${token}`,
		{
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	);
	const data = await res.json();
	console.log("DATA IN FUNC:", data);
	return data;
}

export default function* asyncDecodeTokenApi() {
	try {
		const accessToken = window.localStorage.getItem("accessToken");

		if (accessToken === null || accessToken === undefined) {
			yield put({ type: "FAILURE_DECODE_TOKEN" });
		}

		const finalUserInfoResponse = yield call(getUserInfoFromToken, accessToken);

		if (finalUserInfoResponse.status_code !== 200) {
			yield put({
				type: "FAILURE_DECODE_TOKEN",
			});
			return;
		}

		yield put({
			type: "SUCCESS_DECODE_TOKEN",
			payload: { data: finalUserInfoResponse.results },
		});
	} catch (err) {
		console.error("big error:", err);
	}
}
