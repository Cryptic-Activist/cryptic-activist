export type UserRegistrationParams = {
  names: {
    firstName?: string;
    lastName?: string;
  };
  username?: string;
  referralCode?: string;
  email: string;
  password: string;
  confirmPassword: string;
};
