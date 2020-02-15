import {
  put,
  call,
} from 'redux-saga/effects';

async function getMostReadPostApi() {
  const res = await fetch('http://localhost:5000/homepage/get/blog/most-read', {
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

export default function* asyncGetMostReadPostApi() {
  try {
    const response = yield call(getMostReadPostApi);

    yield put({ type: 'SUCCESS_GET_MOST_READ_POST', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_GET_MOST_READ_POST' });
  }
}
