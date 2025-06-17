type Type =
  | 'DOCUMENT_FRONT'
  | 'DOCUMENT_BACK'
  | 'SELFIE'
  | 'UTILITY_BILL'
  | 'BANK_STATEMENT';

export type UploadedFiles = {
  type: Type;
  file: File;
}[];
