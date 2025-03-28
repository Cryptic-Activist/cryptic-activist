export type User = {
  id: string;
  profileColor: string;
  names: {
    firstName: string;
    lastName: string;
  };
  username: string;
  isDeleted: boolean;
  whenDelete: string;
  createdAt: string;
  updatedAt: string;
};

export type UsersState = {
  data: User[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type CreateUserParams = {
  names: {
    firstName: string;
    lastName: string;
  };
  username: string;
  password: string;
  password2: string;
};
