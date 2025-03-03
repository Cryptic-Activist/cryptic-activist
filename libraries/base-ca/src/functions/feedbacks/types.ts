import { DateType } from '@/functions/types';
import { GetUserReturnType } from '@/functions/users/types';

export type CreateFeedbackParams = {
  vendorId: string;
  userId: string;
  offerId: string;
  message: string;
  type: string;
};

export type WhereFeedbackParams = {
  id?: string;
  vendorId?: string;
  userId?: string;
  offerId?: string;
  message?: string;
  type?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type FeedbackAssociationsArrayType =
  | []
  | ['user']
  | ['offer']
  | ['user', 'offer'];

export type GetFeedbackReturnType = {
  id: string;
  profileColor: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  privateKeys: string[];
  isVerified: boolean;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
  vendor?: GetUserReturnType;
  user?: GetUserReturnType;
};
