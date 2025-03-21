type Language = {
  id: string;
  name: string;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type GetUserTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type GetUserInfoReturn = {
  id: string;
  names: {
    firstName: string;
    lastName: string;
  };
  username: string;
  profileColor: string;
  createdAt: string;
  updatedAt: string;
  languages: Language[];
  lastLoginAt: string;
};
