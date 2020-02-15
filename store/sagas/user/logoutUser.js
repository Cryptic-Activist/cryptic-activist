import {
  put,
  call,
} from 'redux-saga/effects';

async function getLogoutApi() {
  const res = await fetch('http://localhost:5000/auth/logout', {
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

export default function* asyncLogoutUser() {
  try {
    yield call(getLogoutApi);

    yield put({ type: 'SUCCESS_LOGOUT_USER' });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_LOGOUT_USER' });
  }
}
