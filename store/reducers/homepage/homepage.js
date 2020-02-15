import update from 'immutability-helper';

const initialState = {
  mostReadPost: {
    data: {},
    loading: false,
    fetched: false,
    error: false,
  },
};

export default function homepage(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_MOST_READ_POST':
      return update(state, {
        mostReadPost: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_GET_MOST_READ_POST':
      return update(state, {
        mostReadPost: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_GET_MOST_READ_POST':
      return update(state, {
        mostReadPost: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    default:
      return state;
  }
}
