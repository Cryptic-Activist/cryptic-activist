export const setIsMobile = (
	isMobile: boolean
): {
	type: "SET_IS_MOBILE";
	payload: {
		isMobile: boolean;
	};
} => {
	return {
		type: "SET_IS_MOBILE",
		payload: {
			isMobile,
		},
	};
};

export const getDimensions = (
	dimensions: [number, number]
): {
	type: "GET_DIMENSIONS";
	payload: {
		dimensions: [number, number];
	};
} => {
	return {
		type: "GET_DIMENSIONS",
		payload: {
			dimensions,
		},
	};
};

export const resetWarnings = (): { type: "RESET_WARNINGS" } => {
	return {
		type: "RESET_WARNINGS",
	};
};

export const setWarnings = (
	warning: string
): {
	type: string;
	payload: { warning: string };
} => {
	return {
		type: "SET_WARNINGS",
		payload: {
			warning,
		},
	};
};

export const setAsBuy = (): { type: "SET_AS_BUY" } => {
	return {
		type: "SET_AS_BUY",
	};
};

export const setAsSell = (): { type: "SET_AS_SELL" } => {
	return {
		type: "SET_AS_SELL",
	};
};

export const setDarkMode = (): { type: "SET_DARK_MODE" } => {
	return {
		type: "SET_DARK_MODE",
	};
};

export const setLightMode = (): { type: "SET_LIGHT_MODE" } => {
	return {
		type: "SET_LIGHT_MODE",
	};
};

export const setDefaultFiat = (
	symbol: string
): {
	type: "REQUEST_SET_DEFAULT_FIAT";
	payload: { symbol: string };
} => {
	return {
		type: "REQUEST_SET_DEFAULT_FIAT",
		payload: { symbol },
	};
};
export const setDefaultCryptocurrency = (
	coingecko_id: string
): {
	type: "REQUEST_SET_DEFAULT_CRYPTOCURRENCY";
	payload: { coingecko_id: string };
} => {
	return {
		type: "REQUEST_SET_DEFAULT_CRYPTOCURRENCY",
		payload: { coingecko_id },
	};
};

export function setDefaultPaymentMethod(payment_method_id: string): {
	type: "REQUEST_SET_DEFAULT_PAYMENT_METHOD";
	payload: { payment_method_id: string };
} {
	return {
		type: "REQUEST_SET_DEFAULT_PAYMENT_METHOD",
		payload: { payment_method_id },
	};
}

export const setBlockchain = (blockchain: {
	name: string;
	nativeToken: {
		coingecko_id: string;
		symbol: string;
		name: string;
	};
}): {
	type: "SET_BLOCKCHAIN";
	payload: {
		name: string;
		nativeToken: {
			coingecko_id: string;
			symbol: string;
			name: string;
		};
	};
} => {
	return {
		type: "SET_BLOCKCHAIN",
		payload: blockchain,
	};
};

export const resetDefaults = (): { type: "RESET_DEFAULTS" } => {
	return {
		type: "RESET_DEFAULTS",
	};
};

export const resetBlockchain = (): { type: "RESET_BLOCKCHAIN" } => {
	return {
		type: "RESET_BLOCKCHAIN",
	};
};
