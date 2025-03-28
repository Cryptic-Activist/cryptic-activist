import { call, put } from "redux-saga/effects";

const getSystemMessages = async (user_id: string) => {
	const res = await fetch(
		`${process.env.CHAT_API}/system-messages?user_id=${user_id}&associations=user,trade`,
		{
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		}
	);
	const data = await res.json();
	return data;
};

export default function* asyncGetSystemMessages(action) {
	try {
		const systemMessages = yield call(getSystemMessages, action.payload.user_id);

		if (systemMessages.status_code === 200) {
			yield put({
				type: "SUCCESS_GET_SYSTEM_MESSAGES",
				payload: { data: systemMessages.results },
			});
		} else {
			yield put({
				type: "FAILURE_GET_SYSTEM_MESSAGES",
				payload: { data: systemMessages.errors },
			});
		}
	} catch (err) {
		console.error(err);
		yield put({
			type: "FAILURE_GET_SYSTEM_MESSAGES",
			payload: { data: err },
		});
	}
}
