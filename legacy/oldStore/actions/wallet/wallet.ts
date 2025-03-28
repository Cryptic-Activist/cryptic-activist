export function setWallet(): {
	type: "REQUEST_SET_WALLET";
} {
	return {
		type: "REQUEST_SET_WALLET",
	};
}

export function resetWallet(): {
	type: "RESET_WALLET";
} {
	return {
		type: "RESET_WALLET",
	};
}

export const sendTransaction = (
	to: string,
	amount: string
): {
	type: "SEND_TRANSACTION";
	payload: {
		to: string;
		amount: string;
	};
} => {
	return {
		type: "SEND_TRANSACTION",
		payload: {
			to,
			amount,
		},
	};
};
