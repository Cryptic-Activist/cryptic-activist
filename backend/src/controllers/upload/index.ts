import { Request, Response } from 'express';

import dotenv from 'dotenv';
import multer from 'multer';
import { uploadFiles } from '@/services/upload';

dotenv.config();

// Multer setup: store files in memory
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 1MB limit
});

export const uploadFile = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const { folder } = req.body;

  try {
    const uploadedFiles = await uploadFiles(folder, files);

    if (uploadedFiles.error) {
      res.status(400).json({ error: uploadedFiles.error });
      return;
    }

    res
      .status(200)
      .json({ message: 'Files uploaded.', files: uploadedFiles.files });
    return;
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ message: 'Upload failed.', error });
  }
};
