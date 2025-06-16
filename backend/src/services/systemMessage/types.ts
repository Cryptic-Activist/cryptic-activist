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

export type SendRequestMoreEvidencesParams = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  trade: any;
  message: string;
};
