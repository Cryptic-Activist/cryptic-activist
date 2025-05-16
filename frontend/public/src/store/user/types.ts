import { Login2FAParams, LoginParams } from '@/services/user/types';

type Language = {
  id: string;
  name: string;
};

type UserLanguage = {
  language: Language;
}[];

type FeedbacksCount = {
  negative: number;
  neutral: number;
  positive: number;
};

type Count = {
  blocked: number;
  blockers: number;
  feedbacks: FeedbacksCount;
  trusted: number;
  trusters: number;
  trades: number;
};

type Names = {
  firstName?: string;
  lastName?: string;
};

export type User = {
  id?: string;
  names?: Names;
  username?: string;
  email?: string;
  profileColor?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  languages?: Language[];
  _count?: Count;
  twoFactorEnabled?: boolean;
  setUserValue: (value: Value, actionName: `user/${string}`) => void;
  setUser: (user: Value) => void;
  resetUser: () => void;
  login: (
    params: LoginParams
  ) => Promise<{ twoFactorEnabled: boolean } | undefined>;
  login2FA: (params: Login2FAParams) => Promise<boolean>;
  logout: () => void;
};

export type UserStore = {
  user: User;
};

export type UserSetter = {
  id?: string;
  names?: Names;
  username?: string;
  email?: string;
  profileColor?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  languages?: Language[];
  userLanguage?: UserLanguage;
  _count?: Count;
  twoFactorEnabled?: boolean;
};

export type Value = UserSetter;
