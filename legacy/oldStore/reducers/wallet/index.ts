import update from "immutability-helper";

const initialState = {
	data: {},
	loading: false,
	fetched: false,
	errors: [],
};

export default function wallet(state = initialState, action) {
	switch (action.type) {
		case "REQUEST_SET_WALLET":
			return update(state, {
				data: { $set: {} },
				loading: { $set: true },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case "SUCCESS_SET_WALLET":
			return update(state, {
				data: { $set: action.payload.data },
				loading: { $set: false },
				fetched: { $set: true },
				errors: { $set: [] },
			});
		case "FAILURE_SET_WALLET":
			return update(state, {
				data: { $set: {} },
				loading: { $set: false },
				fetched: { $set: true },
				errors: { $set: action.payload.data },
			});
		case "RESET_WALLET":
			return update(state, {
				data: { $set: {} },
				loading: { $set: false },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case "SEND_TRANSACTION":

		default:
			return state;
	}
}
