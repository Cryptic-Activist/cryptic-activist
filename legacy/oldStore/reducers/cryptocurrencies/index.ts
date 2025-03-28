import update from 'immutability-helper';

const initialState = {
  data: [],
  loading: false,
  fetched: false,
  errors: [],
};

export default function cryptocurrencies(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_CRYPTOCURRENCIES':
      return update(state, {
        data: { $set: [] },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] },
      });
    case 'SUCCESS_GET_CRYPTOCURRENCIES':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] },
      });
    case 'FAILURE_GET_CRYPTOCURRENCIES':
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
