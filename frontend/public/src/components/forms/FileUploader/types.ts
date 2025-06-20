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
  onSelect?: (files: File[]) => void;
  label?: string;
  description?: string;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  className?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

export type FileUploaderHandle = {
  upload: () => void;
};
