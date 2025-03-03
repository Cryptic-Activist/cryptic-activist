export const getSystemMessages = (
	user_id: string
): {
	type: "REQUEST_GET_SYSTEM_MESSAGES";
	payload: { user_id: string };
} => {
	return {
		type: "REQUEST_GET_SYSTEM_MESSAGES",
		payload: { user_id },
	};
};
