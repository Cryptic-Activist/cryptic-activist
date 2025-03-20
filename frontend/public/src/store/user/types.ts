import { GetUserInfoReturn, LoginParams } from '@/services/user/types';

type Language = {
  id: string;
  name: string;
};

type Names = {
  firstName?: string;
  lastName?: string;
};

export type User = {
  id?: string;
  names?: Names;
  username?: string;
  profileColor?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  languages?: Language[];
  setUserValue: (value: Value, actionName: `user/${string}`) => void;
  setUser: (user: Value) => void;
  resetUser: () => void;
  decodeAccessToken: () => Promise<GetUserInfoReturn | null>;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
};

export type UserStore = {
  user: User;
};

export type UserSetter = {
  id?: string;
  names?: Names;
  username?: string;
  profileColor?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  languages?: Language[];
};

export type Value = UserSetter;
