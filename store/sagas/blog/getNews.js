import {
  put,
  call,
} from 'redux-saga/effects';

async function getNewsApi() {
  const res = await fetch('http://localhost:5000/blog/home/news', {
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

export default function* asyncNewsApi() {
  try {
    const response = yield call(getNewsApi);

    yield put({ type: 'SUCCESS_NEWS', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_NEWS' });
  }
}
