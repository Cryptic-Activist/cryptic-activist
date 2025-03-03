export const setPrivateKeys = (
	privateKeys: string[]
): { type: "SET_PRIVATE_KEYS"; payload: { privateKeys: string[] } } => {
	return {
		type: "SET_PRIVATE_KEYS",
		payload: {
			privateKeys,
		},
	};
};

export const resetPrivateKeys = (): { type: "RESET_PRIVATE_KEYS" } => {
	return {
		type: "RESET_PRIVATE_KEYS",
	};
};
