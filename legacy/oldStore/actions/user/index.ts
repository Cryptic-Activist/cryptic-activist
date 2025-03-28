export function loginUser(userObj: { username: string; password: string }): {
	type: "REQUEST_LOGIN_USER";
	payload: { userObj: { username: string; password: string } };
} {
	return {
		type: "REQUEST_LOGIN_USER",
		payload: {
			userObj,
		},
	};
}

export function decodeAccessToken(): { type: "REQUEST_DECODE_TOKEN" } {
	return {
		type: "REQUEST_DECODE_TOKEN",
	};
}

export function logoutUser(): { type: "REQUEST_LOGOUT_USER" } {
	return {
		type: "REQUEST_LOGOUT_USER",
	};
}
