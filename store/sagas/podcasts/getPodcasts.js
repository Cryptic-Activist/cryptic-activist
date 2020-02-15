import {
  put,
  call,
} from 'redux-saga/effects';

async function getPodcastsApi() {
  const res = await fetch('http://localhost:5000/podcasts/', {
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

export default function* asyncGetPodcasts() {
  try {
    const response = yield call(getPodcastsApi);

    yield put({ type: 'SUCCESS_ALL_PODCASTS', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_ALL_PODCASTS' });
  }
}
