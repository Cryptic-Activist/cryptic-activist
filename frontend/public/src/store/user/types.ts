type Language = {
  id: string;
  name: string;
};

export type User = {
  names: {
    firstName: string;
    lastName: string;
  };
  username: string;
  profileColor: string;
  createdAt: string;
  updatedAt: string;
  languages: Language[];
};

export type UserState = User;

export type UserSetter = {
  names?: {
    firstName?: string;
    lastName?: string;
  };
  username?: string;
  profileColor?: string;
  createdAt?: string;
  updatedAt?: string;
  languages?: Language[];
};
