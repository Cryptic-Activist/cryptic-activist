export type UseUsersParams = boolean;
export type CreateUserParams = {
  names: {
    firstName: string;
    lastName: string;
  };
  username: string;
  password: string;
  password2: string;
};
