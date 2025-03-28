import update from "immutability-helper";

const initialState = [];

export default function privateKeys(state = initialState, action) {
	switch (action.type) {
		case "SET_PRIVATE_KEYS":
			return update(state, { $set: action.payload.privateKeys });
		case "RESET_PRIVATE_KEYS":
			return update(state, { $set: [] });
		default:
			return state;
	}
}
