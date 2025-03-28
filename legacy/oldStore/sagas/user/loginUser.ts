import { call, put } from "redux-saga/effects";

interface IResponse {
	status_code: number;
	results: { accessToken: string };
	errors: string[];
}

async function loginUser(userObj: {
	username: string;
	password: string;
}): Promise<IResponse> {
	const res = await fetch(`${process.env.USER_API}/user/auth/login`, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userObj),
	});
	const data = await res.json();
	return data;
}

async function getUserInfoFromToken(token: string): Promise<IResponse> {
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
	return data;
}

export default function* asyncLoginUserApi(action) {
	try {
		const response: IResponse = yield call(loginUser, action.payload.userObj);

		if (response.status_code === 200) {
			if (window.localStorage.getItem("accessToken") !== undefined) {
				window.localStorage.removeItem("accessToken");
			}

			window.localStorage.setItem("accessToken", response.results.accessToken);
			const finalUserInfoResponse = yield call(
				getUserInfoFromToken,
				response.results.accessToken
			);

			if (finalUserInfoResponse.status_code === 200) {
				yield put({
					type: "SUCCESS_LOGIN_USER",
					payload: { data: finalUserInfoResponse.results },
				});
			} else {
				const errorMessages: string[] = finalUserInfoResponse.errors.map(
					(errorMessage: string) => errorMessage
				);

				yield put({
					type: "FAILURE_LOGIN_USER",
					payload: { data: errorMessages },
				});
			}
		} else {
			const errorMessages: string[] = response.errors.map(
				(errorMessage: string) => errorMessage
			);

			yield put({
				type: "FAILURE_LOGIN_USER",
				payload: { data: errorMessages },
			});
		}
	} catch (err) {
		console.error(err);
		yield put({ type: "FAILURE_LOGIN_USER" });
	}
}
