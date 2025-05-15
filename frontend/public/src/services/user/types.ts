type Language = {
  id: string;
  name: string;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type Login2FAParams = {
  userId: string;
  token2FA: string;
};

export type GetUserTokenResponse =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | {
      userId: string;
      twoFactorEnabled: boolean;
    };

export type GetUserInfoReturn = {
  id: string;
  names: {
    firstName: string;
    lastName: string;
  };
  username: string;
  email: string;
  profileColor: string;
  createdAt: string;
  updatedAt: string;
  languages: Language[];
  userLanguage?: any[];
  lastLoginAt: string;
  _count: any;
};
