export type FileType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/webp'
  | 'application/pdf';

export type FileUploaderProps = {
  allowedFileTypes: FileType[];
  allowMultiple: boolean;
  onUpload: (files: File[]) => Promise<void>;
  label?: string;
  description?: string;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  className?: string;
};

export type FileUploaderHandle = {
  upload: () => void;
};
