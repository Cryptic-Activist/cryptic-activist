export type UploadEvidenceFilesParams = {
  formData: FormData;
  tradeId: string;
};

export type UploadKYCFilesParams = {
  formData: FormData;
  userId: string;
};

export type UploadChatMessageFilesParams = {
  formData: FormData;
  userId: string;
  chatId: string;
};
