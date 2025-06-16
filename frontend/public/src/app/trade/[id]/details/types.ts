import { FileUploaderHandle } from '@/components/forms/FileUploader/types';
import { RefObject } from 'react';
import { Type } from '@/components/FeedbackSelector/types';

export type TradeDetailsProps = {
  trade: any;
  app: any;
  user: any;
  handleEvidenceUpload: () => void;
  onUploadEvidences: (files: File[]) => Promise<void>;
  uploaderRef: RefObject<FileUploaderHandle | null>;
  onSubmitMoreEvidences: () => void;
  handleSubmitMoreEvidences: any;
};

export type FeedbackProps = {
  user: any;
  feedback: {
    type: Type;
    message: string;
    trader: any;
  };
};
