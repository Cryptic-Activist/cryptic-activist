export type AddSpokenLanguagesParams = {
  userId: string;
  language: string;
};

export type RemoveSpokenLanguagesParams = {
  userId: string;
  languageId: string;
};

export type UpdateEmailParams = {
  userId: string;
  email: string;
};
