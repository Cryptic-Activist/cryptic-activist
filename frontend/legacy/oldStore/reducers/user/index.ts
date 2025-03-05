import update from "immutability-helper";

const initialState = {
	data: {},
	loading: false,
	fetched: false,
	errors: [],
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case "REQUEST_LOGIN_USER":
			console.log("action req:", action);
			return update(state, {
				data: { $set: {} },
				loading: { $set: true },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case "SUCCESS_LOGIN_USER":
			return update(state, {
				data: { $set: action.payload.data },
				loading: { $set: false },
				fetched: { $set: true },
				errors: { $set: [] },
			});
		case "FAILURE_LOGIN_USER":
			return update(state, {
				data: { $set: {} },
				loading: { $set: false },
				fetched: { $set: false },
				errors: { $set: action.payload.data },
			});
		case "REQUEST_DECODE_TOKEN":
			return update(state, {
				data: { $set: {} },
				loading: { $set: true },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case "SUCCESS_DECODE_TOKEN":
			return update(state, {
				data: { $set: action.payload.data },
				loading: { $set: false },
				fetched: { $set: true },
				errors: { $set: [] },
			});
		case "FAILURE_DECODE_TOKEN":
			return update(state, {
				data: { $set: {} },
				loading: { $set: false },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case "REQUEST_LOGOUT_USER":
			return update(state, {
				data: { $set: {} },
				loading: { $set: true },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case "SUCCESS_LOGOUT_USER":
			return update(state, {
				data: { $set: {} },
				loading: { $set: false },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		case "FAILURE_LOGOUT_USER":
			return update(state, {
				data: { $set: {} },
				loading: { $set: false },
				fetched: { $set: false },
				errors: { $set: [] },
			});
		default:
			return state;
	}
}
