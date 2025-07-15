import { Request, Response } from 'express';

import { BACKEND } from '@/constants/env';
import { IS_DEVELOPMENT } from '@/constants';
import { S3 } from 'aws-sdk';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { uploadFiles } from '@/services/upload';

dotenv.config();

// Multer setup: store files in memory
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 1MB limit
});

// AWS S3 config
const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
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
