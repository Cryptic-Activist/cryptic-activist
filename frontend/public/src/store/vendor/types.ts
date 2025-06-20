type Language = {
  id: string;
  name: string;
};

type UserLanguage = {
  language: Language;
}[];

type FeedbacksCount = {
  negative: number;
  neutral: number;
  positive: number;
};

type Count = {
  blocked: number;
  blockers: number;
  feedbacks: FeedbacksCount;
  trusted: number;
  trusters: number;
  trades: number;
};

type Names = {
  firstName?: string;
  lastName?: string;
};

type KYC = {
  status: 'VERIFIED' | 'REJECTED' | 'PENDING';
};

export type Vendor = {
  id?: string;
  names?: Names;
  username?: string;
  profileColor?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  kyc?: KYC[];
  languages?: Language[];
  _count?: Count;
  setVendorValue: (value: Value, actionName: `vendor/${string}`) => void;
  setVendor: (user: Value) => void;
  resetVendor: () => void;
};

export type VendorStore = {
  vendor: Vendor;
};

export type VendorSetter = {
  id?: string;
  names?: Names;
  username?: string;
  profileColor?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  kyc?: KYC[];
  languages?: Language[];
  userLanguage?: UserLanguage;
  _count?: Count;
};

export type Value = VendorSetter;
