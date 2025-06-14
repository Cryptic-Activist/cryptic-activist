export type SendWarningToUserParams = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  trade: any;
  message: string;
};
