import {
  put,
  call,
} from 'redux-saga/effects';

async function getPostApi(slug) {
  const res = await fetch(`http://localhost:5000/blog/get/slug/${slug}`, {
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

export default function* asyncGetPostApi(action) {
  try {
    const response = yield call(getPostApi, action.payload.slug);
    yield put({ type: 'SUCCESS_POST', payload: { data: response[0] } });
  } catch (err) {
    yield put({ type: 'FAILURE_POST' });
  }
}
