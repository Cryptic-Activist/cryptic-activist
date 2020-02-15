const initialState = {
  data: [],
  loading: false,
  fetched: false,
  error: false,
};

export default function podcasts(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_PODCASTS':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_ALL_PODCASTS':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_ALL_PODCASTS':
      return {
        ...state,
        data: [],
        fetched: true,
        error: true,
      };
    default:
      return state;
  }
}
