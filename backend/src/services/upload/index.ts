import {
  BACKEND,
  DO_SPACES_ACCESS_KEY_ID,
  DO_SPACES_BUCKET_NAME,
  DO_SPACES_REGION,
  DO_SPACES_SECRET_ACCESS_KEY,
} from '@/constants/env';
import {
  GetObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { IS_DEVELOPMENT } from '@/constants';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

dotenv.config();

// Multer setup: store files in memory
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// DigitalOcean Spaces configuration
const s3 = new S3Client({
  endpoint: `https://${DO_SPACES_REGION}.digitaloceanspaces.com`,
  region: DO_SPACES_REGION!,
  credentials: {
    accessKeyId: DO_SPACES_ACCESS_KEY_ID!,
    secretAccessKey: DO_SPACES_SECRET_ACCESS_KEY!,
  },
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
        const objectKey = `${folder}/${fileName}`;

        if (!IS_DEVELOPMENT) {
          // Upload to DigitalOcean Spaces
          const uploadParams = {
            Bucket: DO_SPACES_BUCKET_NAME!,
            Key: objectKey,
            Body: finalBuffer,
            ContentType: mimeType,
            ACL: 'private' as ObjectCannedACL,
          };

          await s3.send(new PutObjectCommand(uploadParams));
          const url = `https://${DO_SPACES_BUCKET_NAME}.${DO_SPACES_REGION}.digitaloceanspaces.com/${folder}/${fileName}`;
          return {
            fileName,
            key: objectKey,
            mimeType,
            size,
            url,
          };
        } else {
          // Save to local /uploads folder
          const localPath = path.join(__dirname, `../../uploads/${folder}`);
          if (!fs.existsSync(localPath)) {
            fs.mkdirSync(localPath, { recursive: true });
          }

          const filePath = path.join(localPath, fileName);
          fs.writeFileSync(filePath, finalBuffer);

          const url = `${BACKEND}/uploads/${folder}/${fileName}`;

          return {
            fileName,
            key: objectKey,
            mimeType,
            size,
            url,
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

export const getPresignedUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: DO_SPACES_BUCKET_NAME!,
    Key: key,
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return { url };
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return { error: 'Could not generate presigned URL.' };
  }
};
