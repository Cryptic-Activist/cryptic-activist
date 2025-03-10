import type { UserSetter, UserState } from './types';

import { map } from 'nanostores';

export const $user = map<UserState>();

const setter = ({
  id,
  createdAt,
  languages,
  names,
  profileColor,
  updatedAt,
  username,
}: UserSetter) => {
  const user = $user.get();

  $user.set({
    id: id ?? user.id,
    names: {
      firstName: names?.firstName ?? user.names.firstName,
      lastName: names?.lastName ?? user.names.lastName,
    },
    createdAt: createdAt ?? user.createdAt,
    languages: languages ?? user.languages,
    profileColor: profileColor ?? user.profileColor,
    updatedAt: updatedAt ?? user.updatedAt,
    username: username ?? user.updatedAt,
  });
};

export const setUserInfo = (userInfo: UserSetter) => {
  setter({
    id: userInfo.id,
    createdAt: userInfo.createdAt,
    names: {
      firstName: userInfo.names?.firstName,
      lastName: userInfo.names?.lastName,
    },
    profileColor: userInfo.profileColor,
    updatedAt: userInfo.updatedAt,
    username: userInfo.username,
    languages: userInfo.languages,
  });
};

export const resetUserInfo = () => {
  // @ts-ignore
  $user.set({});
};
