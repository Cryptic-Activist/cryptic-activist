export type Generate2FAParams = {
  userId: string;
  email: string;
};

export type Verify2FAParams = {
  token: string;
  userId: string;
};
