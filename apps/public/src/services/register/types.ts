export type UserRegistrationParams = {
  names: {
    firstName?: string;
    lastName?: string;
  };
  username?: string;
  password: string;
  confirmPassword: string;
};
