import update from "immutability-helper";

const initialState = {
	isMobile: false,
	dimensions: [0, 0],
	warnings: [],
	type: "buy",
	theme: "light",
	defaults: {
		fiat: {
			id: null,
			symbol: null,
			name: null,
		},
		cryptocurrency: {
			id: null,
			coingecko_id: null,
			symbol: null,
			name: null,
			icon: null,
		},
		payment_method: {
			id: null,
			name: null,
			payment_method_category: {
				id: null,
				name: null,
			},
		},
	},
	blockchain: {
		name: null,
		nativeToken: {
			coingecko_id: null,
			symbol: null,
			name: null,
		},
	},
};

export default function app(state = initialState, action) {
	switch (action.type) {
		case "SET_IS_MOBILE":
			return update(state, {
				isMobile: { $set: action.payload.isMobile },
			});
		case "GET_DIMENSIONS":
			return update(state, {
				dimensions: { $set: action.payload.dimensions },
			});
		case "RESET_WARNINGS":
			return update(state, {
				warnings: { $set: [] },
			});
		case "SET_WARNINGS":
			console.log("reduce action:", action);
			if (
				state.warnings.filter(
					(warningMessage) => warningMessage === action.payload.warning
				).length === 0
			) {
				return update(state, {
					warnings: { $set: state.warnings.concat(action.payload.warning) },
				});
			}
			break;
		case "SET_AS_BUY":
			return update(state, {
				type: { $set: "buy" },
			});
		case "SET_AS_SELL":
			return update(state, {
				type: { $set: "sell" },
			});
		case "SET_DARK_MODE":
			return update(state, {
				theme: { $set: "dark" },
			});
		case "SET_LIGHT_MODE":
			return update(state, {
				theme: { $set: "light" },
			});
		case "SUCCESS_SET_DEFAULT_FIAT":
			return update(state, {
				defaults: {
					fiat: { $set: action.payload.fiat },
				},
			});
		case "SUCCESS_SET_DEFAULT_CRYPTOCURRENCY":
			return update(state, {
				defaults: {
					cryptocurrency: { $set: action.payload.cryptocurrency },
				},
			});
		case "SUCCESS_SET_DEFAULT_PAYMENT_METHOD":
			console.log("action.payload:", action.payload);
			return update(state, {
				defaults: {
					payment_method: { $set: action.payload.payment_method },
				},
			});
		case "SET_BLOCKCHAIN": {
			return update(state, {
				blockchain: {
					name: { $set: action.payload.blockchain.name },
					nativeToken: {
						coingecko_id: {
							$set: action.payload.blockchain.nativeToken.coingecko_id,
						},
						symbol: {
							$set: action.payload.blockchain.nativeToken.symbol,
						},
						name: {
							$set: action.payload.blockchain.nativeToken.name,
						},
					},
				},
			});
		}
		case "RESET_BLOCKCHAIN": {
			return update(state, {
				blockchain: {
					name: { $set: null },
					nativeToken: {
						coingecko_id: { $set: null },
						symbol: { $set: null },
						name: { $set: null },
					},
				},
			});
		}
		case "RESET_DEFAULTS":
			return update(state, {
				defaults: {
					fiat: {
						symbol: null,
						name: null,
					},
					cryptocurrency: {
						coingecko_id: null,
						symbol: null,
						name: null,
					},
				},
			});
		default:
			return state;
	}
}
