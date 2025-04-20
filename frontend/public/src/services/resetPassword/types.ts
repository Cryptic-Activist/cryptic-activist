export type UserResetPasswordRequestParams = {
  unique: string;
};

export type UserResetPasswordParams = {
  password: string;
  passwordConfirm: string;
  token: string;
};
