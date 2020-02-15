import {
  put,
  call,
} from 'redux-saga/effects';

async function getArticlesApi() {
  const res = await fetch('http://localhost:5000/blog/home/articles', {
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

export default function* asyncArticlesApi() {
  try {
    const response = yield call(getArticlesApi);

    yield put({ type: 'SUCCESS_ARTICLES', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_ARTICLES' });
  }
}
