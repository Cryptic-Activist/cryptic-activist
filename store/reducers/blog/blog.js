import update from 'immutability-helper';

const initialState = {
  blogCategories: {
    data: [],
    loading: false,
    fetched: false,
    error: false,
  },
  mainBlogPost: {
    data: [],
    loading: false,
    fetched: false,
    error: false,
  },
  mostRecentVideos: {
    data: [],
    loading: false,
    fetched: false,
    error: false,
  },
  news: {
    data: [],
    loading: false,
    fetched: false,
    error: false,
  },
  articles: {
    data: [],
    loading: false,
    fetched: false,
    error: false,
  },
  tutorials: {
    data: [],
    loading: false,
    fetched: false,
    error: false,
  },
};

export default function blog(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_RECENT_CATEGORIES':
      return update(state, {
        blogCategories: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_RECENT_CATEGORIES':
      return update(state, {
        blogCategories: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_RECENT_CATEGORIES':
      return update(state, {
        blogCategories: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    case 'REQUEST_GET_MAIN_BLOG_POSTS':
      return update(state, {
        mainBlogPost: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_GET_MAIN_BLOG_POSTS':
      return update(state, {
        mainBlogPost: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_GET_MAIN_BLOG_POSTS':
      return update(state, {
        mainBlogPost: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    case 'REQUEST_MOST_RECENT_VIDEOS':
      return update(state, {
        mostRecentVideos: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_MOST_RECENT_VIDEOS':
      return update(state, {
        mostRecentVideos: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_MOST_RECENT_VIDEOS':
      return update(state, {
        mostRecentVideos: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    case 'REQUEST_NEWS':
      return update(state, {
        news: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_NEWS':
      return update(state, {
        news: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_NEWS':
      return update(state, {
        news: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    case 'REQUEST_ARTICLES':
      return update(state, {
        articles: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_ARTICLES':
      return update(state, {
        articles: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_ARTICLES':
      return update(state, {
        articles: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    case 'REQUEST_TUTORIALS':
      return update(state, {
        tutorials: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_TUTORIALS':
      return update(state, {
        tutorials: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_TUTORIALS':
      return update(state, {
        tutorials: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    default:
      return state;
  }
}
