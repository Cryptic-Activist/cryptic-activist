const initialState = {
  data: [],
  loading: false,
  fetched: false,
  error: false,
};

export default function podcastsByCategory(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PODCASTS_BY_CATEGORY':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_PODCASTS_BY_CATEGORY':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_PODCASTS_BY_CATEGORY':
      return {
        ...state,
        data: [],
        loading: false,
        fetched: true,
        error: true,
      };
    default:
      return state;
  }
}
