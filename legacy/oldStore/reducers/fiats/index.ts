import update from 'immutability-helper';

const initialState = {
  data: [],
  loading: false,
  fetched: false,
  errors: [],
};

export default function fiats(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_FIATS':
      return update(state, {
        data: { $set: [] },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] },
      });
    case 'SUCCESS_GET_FIATS':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] },
      });
    case 'FAILURE_GET_FIATS':
      return update(state, {
        data: { $set: [] },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: action.payload.data },
      });
    default:
      return state;
  }
}
