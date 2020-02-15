const initialState = {
  data: {},
  loading: false,
  fetched: false,
  error: false,
};

export default function publicProfile(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_PUBLIC_PROFILE':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_GET_PUBLIC_PROFILE':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_GET_PUBLIC_PROFILE':
      return {
        ...state,
        data: {},
        loading: false,
        fetched: true,
        error: true,
      };
    default:
      return state;
  }
}
