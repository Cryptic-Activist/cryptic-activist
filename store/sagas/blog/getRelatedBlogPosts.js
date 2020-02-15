import {
  put,
  call,
} from 'redux-saga/effects';

const getRelatedBlogPostsApi = async (category, slug) => {
  const dates = slug.split('/');
  const response = await fetch(
    `http://localhost:5000/blog/get/category/newest/${category}/${dates[0]}/${dates[1]}/${dates[2]}/${dates[3]}`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  return data;
};

export default function* asyncGetRelatedBlogPostsApi(action) {
  try {
    const response = yield call(getRelatedBlogPostsApi, action.payload.category, action.payload.slug);

    yield put({ type: 'SUCCESS_GET_RELATED_POSTS', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_GET_RELATED_POSTS' });
  }
}
