import {
  put,
  call,
} from 'redux-saga/effects';

async function getPodcastsByCategoryApi(category) {
  const res = await fetch(`http://localhost:5000/podcasts/get/category/${category}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export default function* asyncPodcastsByCategoryApi(action) {
  try {
    const response = yield call(getPodcastsByCategoryApi, action.payload.category);

    yield put({ type: 'SUCCESS_PODCASTS_BY_CATEGORY', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_PODCASTS_BY_CATEGORY' });
  }
}
