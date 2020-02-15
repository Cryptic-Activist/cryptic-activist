import {
  put,
  call,
} from 'redux-saga/effects';

async function getRelatedPodcastsApi(category, slug) {
  const res = await fetch(`http://localhost:5000/podcasts/get/category/newest/${category}/${slug}`, {
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

export default function* asyncGetRelatedPodcastsApi(action) {
  try {
    const response = yield call(
      getRelatedPodcastsApi,
      action.payload.category,
      action.payload.slug,
    );

    yield put({ type: 'SUCCESS_RELATED_PODCASTS', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_RELATED_PODCASTS' });
  }
}
