import {
  put,
  call,
} from 'redux-saga/effects';

async function getMostRecentVideosApi() {
  const res = await fetch('http://localhost:5000/blog/home/most-recent-videos', {
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

export default function* asyncGetMostRecentVideosApi() {
  try {
    const response = yield call(getMostRecentVideosApi);

    yield put({ type: 'SUCCESS_MOST_RECENT_VIDEOS', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_MOST_RECENT_VIDEOS' });
  }
}
