const initialState = {
  data: [],
  loading: false,
  fetched: false,
  error: false,
};

export default function postsByTag(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_POSTS_BY_TAG':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_POSTS_BY_TAG':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_POSTS_BY_TAG':
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
