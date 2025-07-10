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

export const uploadFiles = async (
  folder: string,
  files: Express.Multer.File[],
) => {
  try {
    if (!files || !folder) {
      return { error: 'No files uploaded.' };
    }

    const results = await Promise.all(
      (files as Express.Multer.File[]).map(async (file) => {
        const isPdf = file.mimetype === 'application/pdf';
        const isJson = file.mimetype === 'application/json';
        const skipProcessing = isPdf || isJson;

        const hash = crypto
          .createHash('sha256')
          .update(file.buffer)
          .digest('hex')
          .slice(0, 12);

        // Get correct file extension
        const ext = isPdf ? 'pdf' : isJson ? 'json' : 'webp';
        const fileName = `${Date.now()}-${hash}.${ext}`;

        const finalBuffer = skipProcessing
          ? file.buffer
          : await sharp(file.buffer)
              .resize({ width: 720, withoutEnlargement: true })
              .webp({ quality: 20 })
              .toFormat('webp', { progressive: true })
              .greyscale()
              .toBuffer();

        const size = finalBuffer.length;
        const mimeType = skipProcessing ? file.mimetype : 'image/webp';

        if (!IS_DEVELOPMENT) {
          // Upload to S3
          const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: `${folder}/${fileName}`,
            Body: finalBuffer,
            ContentType: mimeType,
            ACL: 'public-read',
          };

          const { Location } = await s3.upload(uploadParams).promise();

          return {
            fileName,
            key: Location,
            mimeType,
            size,
          };
        } else {
          // Save to local /uploads folder
          const localPath = path.join(__dirname, `../../uploads/${folder}`);
          if (!fs.existsSync(localPath)) {
            fs.mkdirSync(localPath, { recursive: true });
          }

          const filePath = path.join(localPath, fileName);
          fs.writeFileSync(filePath, finalBuffer);

          const key = `${BACKEND}/uploads/${folder}/${fileName}`;

          return {
            fileName,
            key,
            mimeType,
            size,
          };
        }
      }),
    );

    return { message: 'Files uploaded.', files: results };
  } catch (error) {
    console.error('Upload failed:', error);
    return { message: 'Upload failed.', error };
  }
};
