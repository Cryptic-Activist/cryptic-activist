import {
  put,
  call,
} from 'redux-saga/effects';

async function loginAdminUserApi(adminUser, adminPassword) {
  const response = await fetch('http://localhost:5000/admin/user/login/admin',
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminUser,
        adminPassword,
      }),
    });
  const data = await response.json();
  return data;
}

async function loginSetUserApi(id) {
  const res = await fetch(`http://localhost:5000/auth/user/${id}`, {
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

export default function* asyncLoginAdminUserApi(action) {
  try {
    const response = yield call(loginAdminUserApi, action.payload.username, action.payload.password);
    yield call(loginSetUserApi, response.id);

    yield put({ type: 'SUCCESS_REGISTER_ADMIN_USER', payload: { data: response } });
  } catch (err) {
    console.log('err:', err);
    yield put({ type: 'FAILURE_REGISTER_ADMIN_USER' });
  }
}
