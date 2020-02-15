import {
  put,
  call,
} from 'redux-saga/effects';

async function registerAdminUserApi(adminRegisterInfo, profilePictureId) {
  const response = await fetch('http://localhost:5000/admin/user/register/admin',
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminRegisterInfo,
        profilePictureId,
      }),
    });
  const data = await response.json();
  return data;
}

async function loginUserApi(id) {
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

export default function* asyncRegisterAdminUserApi(action) {
  try {
    const response = yield call(registerAdminUserApi,
      action.payload.adminRegisterInfo,
      action.payload.profilePictureId);
    const responseLoginAdminUser = yield call(loginUserApi, response.id);

    yield put({
      type: 'SUCCESS_REGISTER_ADMIN_USER',
      payload: { data: responseLoginAdminUser },
    });
  } catch (err) {
    console.log('err:', err);
    yield put({ type: 'FAILURE_REGISTER_ADMIN_USER' });
  }
}
