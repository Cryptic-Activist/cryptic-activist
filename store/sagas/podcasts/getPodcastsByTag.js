import {
  put,
  call,
} from 'redux-saga/effects';

async function getPodcastsByTagApi(tag) {
  const res = await fetch(`http://localhost:5000/podcasts/get/tag/${tag}`, {
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

export default function* asyncPodcastsByTagApi(action) {
  try {
    const response = yield call(getPodcastsByTagApi, action.payload.tag);

    yield put({ type: 'SUCCESS_PODCASTS_BY_TAG', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_PODCASTS_BY_TAG' });
  }
}
