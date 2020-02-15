/* eslint-disable import/prefer-default-export */
export function loginUser() {
  return {
    type: 'REQUEST_LOGIN_USER',
  };
}

export function refreshUserData(id) {
  return {
    type: 'REQUEST_REFRESH_USER_DATA',
    payload: {
      id,
    },
  };
}

export function updateUserInfo(updateObj) {
  return {
    type: 'REQUEST_UPDATE_USER_INFO',
    payload: {
      updateObj,
    },
  };
}

export function logoutUser() {
  return {
    type: 'REQUEST_LOGOUT_USER',
  };
}

export function loginUserProvider(endpoint) {
  return {
    type: 'REQUEST_LOGIN_USER_PROVIDER',
    payload: {
      endpoint,
    },
  };
}

export function getPublicProfile(user) {
  return {
    type: 'REQUEST_GET_PUBLIC_PROFILE',
    payload: {
      user,
    },
  };
}


export function setFollowAuthor(userId, authorId) {
  return {
    type: 'REQUEST_SET_FOLLOW_AUTHOR',
    payload: {
      userId,
      authorId,
    },
  };
}

export function setUnfollowAuthor(userId, authorId) {
  return {
    type: 'REQUEST_SET_UNFOLLOW_AUTHOR',
    payload: {
      userId,
      authorId,
    },
  };
}

export function registerAdminUser(adminRegisterInfo, profilePictureId) {
  return {
    type: 'REQUEST_REGISTER_ADMIN_USER',
    payload: {
      adminRegisterInfo,
      profilePictureId,
    },
  };
}

export function loginAdminUser(username, password) {
  return {
    type: 'REQUEST_LOGIN_ADMIN_USER',
    payload: {
      username,
      password,
    },
  };
}
