export type LoginAdminParams = {
  username: string;
  password: string;
};

export type GetTokensReturn = {
  accessToken: string;
  refreshToken: string;
};

export type GetAdminInfoReturn = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type Admin = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminState = {
  data?: Admin;
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type RegisterAdminParams = {
  names: {
    firstName: string;
    lastName: string;
  };
  username: string;
  password: string;
  password2: string;
};
