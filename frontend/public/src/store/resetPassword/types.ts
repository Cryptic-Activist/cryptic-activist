export type ResetPasswordSetter = {
  token?: string;
};

export type Value = ResetPasswordSetter;

export type ResetPasswordStore = {
  resetPassword: {
    token?: string;
    setResetPasswordValue: (
      value: Value,
      action?: `resetPassword/${string}`
    ) => void;
    setResetPassword: (resetPassword: Value) => void;
    resetResetPassword: () => void;
  };
};
