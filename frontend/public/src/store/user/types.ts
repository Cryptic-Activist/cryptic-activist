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

type Tier = {
  id: string;
  name: string;
  description: string;
  level: number;
  tradingFee: number;
  discount: number;
  minVolume: number;
  requiredXP: number;
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
  twoFactorEnabled?: boolean;
  referralCode?: string;
  xp?: number;
  tier?: Tier;
  _count?: Count;
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
  twoFactorEnabled?: boolean;
  referralCode?: string;
  xp?: number;
  tier?: Tier;
  _count?: Count;
};

export type Value = UserSetter;
