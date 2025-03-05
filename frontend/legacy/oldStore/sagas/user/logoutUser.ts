import { put } from 'redux-saga/effects';

export default function* asyncLoginUserApi() {
  try {
    if (window.localStorage.getItem('accessToken') !== undefined) {
      window.localStorage.removeItem('accessToken');
    }

    yield put({ type: 'SUCCESS_LOGOUT_USER' });
  } catch (err) {
    console.error(err);
    yield put({ type: 'FAILURE_LOGOUT_USER' });
  }
}
