import { DateType } from '../types';

export type CreateAdminParams = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export type WhereAdminParams = {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type AdminDynamicType = WhereAdminParams;

export type GetAdminReturnType = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isVerified: boolean;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
};
