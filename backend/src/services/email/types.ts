export type SendEmailParams = {
  from: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  }[];
  subject: string;
  html?: string;
  text?: string;
};
