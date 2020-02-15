import update from 'immutability-helper';

const initialState = {
  data: {},
  loading: false,
  fetched: false,
  error: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_REGISTER_ADMIN_USER':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_REGISTER_ADMIN_USER':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_REGISTER_ADMIN_USER':
      return {
        ...state,
        data: {},
        loading: false,
        fetched: true,
        error: true,
      };
    case 'REQUEST_LOGIN_ADMIN_USER':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_LOGIN_ADMIN_USER':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_LOGIN_ADMIN_USER':
      return {
        ...state,
        data: {},
        loading: false,
        fetched: true,
        error: true,
      };
    case 'REQUEST_LOGIN_USER':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_LOGIN_USER':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_LOGIN_USER':
      return {
        ...state,
        data: {},
        loading: false,
        fetched: true,
        error: true,
      };
    case 'REQUEST_LOGIN_USER_PROVIDER':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_LOGIN_USER_PROVIDER':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_LOGIN_USER_PROVIDER':
      return {
        ...state,
        data: {},
        loading: false,
        fetched: true,
        error: true,
      };
    case 'REQUEST_REFRESH_USER_DATA':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_REFRESH_USER_DATA':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_REFRESH_USER_DATA':
      return {
        ...state,
        loading: false,
        fetched: true,
        error: true,
      };
    case 'REQUEST_LOGOUT_USER':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_LOGOUT_USER':
      return {
        ...state,
        data: [],
        loading: false,
        fetched: true,
        error: false,
      };
    case 'FAILURE_LOGOUT_USER':
      return {
        ...state,
        data: [],
        loading: false,
        fetched: true,
        error: true,
      };
    case 'REQUEST_UPDATE_USER_INFO':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_UPDATE_USER_INFO':
      return update(state, {
        data: {
          email: { $set: action.payload.data.email },
          quote: { $set: action.payload.data.quote },
          socialMedia: {
            github: { $set: action.payload.data.github },
            linkedin: { $set: action.payload.data.linkedin },
            twitter: { $set: action.payload.data.twitter },
          },
        },
        loading: { $set: false },
        fetch: { $set: true },
        error: { $set: false },
      });
    case 'FAILURE_UPDATE_USER_INFO':
      return {
        ...state,
        loading: false,
        fetched: true,
        error: true,
      };
    case 'REQUEST_SET_FOLLOW_AUTHOR':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_SET_FOLLOW_AUTHOR':
      console.log('SUCCESS_SET_FOLLOW_AUTHOR:', action);
      return update(state, {
        data: {
          following: { $push: [action.payload.data.authorId] },
        },
        loading: { $set: false },
        fetch: { $set: true },
        error: { $set: false },
      });
    case 'FAILURE_SET_FOLLOW_AUTHOR':
      return {
        ...state,
        data: {},
        loading: false,
        fetched: true,
        error: true,
      };
    case 'REQUEST_SET_UNFOLLOW_AUTHOR':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_SET_UNFOLLOW_AUTHOR':
      return update(state, {
        data: {
          following: { $set: action.payload.data.userFollowingArray },
        },
        loading: { $set: false },
        fetch: { $set: true },
        error: { $set: false },
      });
    case 'FAILURE_SET_UNFOLLOW_AUTHOR':
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
