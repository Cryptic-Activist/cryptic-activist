import {
  put,
  call,
} from 'redux-saga/effects';

async function getLoginProviderApi(endpoint) {
  console.log('login provider endpoint:', endpoint);
  const res = await fetch(endpoint, {
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

export default function* asyncLoginUserProviderApi(action) {
  try {
    console.log('action in async:', action);
    const response = yield call(getLoginProviderApi, action.payload.endpoint);

    yield put({ type: 'SUCCESS_LOGIN_USER_PROVIDER', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_LOGIN_USER_PROVIDER' });
  }
}
