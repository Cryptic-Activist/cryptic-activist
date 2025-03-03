export interface IUser {
  username: string;
  password: string;
  is_verified: boolean;
  createdAt: Date;
  updatedAt: null | Date;
}
