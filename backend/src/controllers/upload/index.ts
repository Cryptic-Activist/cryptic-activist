import { Request, Response } from 'express';

import { IS_DEVELOPMENT } from '@/constants';
import { S3 } from 'aws-sdk';
import dotenv from 'dotenv';
import fs from 'fs';
import { generateRandomHash } from '@/utils/string';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

dotenv.config();

// Multer setup: store files in memory
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 }, // 2MB limit
});

// AWS S3 config
const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      res.status(400).json({ message: 'No files uploaded.' });
      return;
    }

    const results = await Promise.all(
      (req.files as Express.Multer.File[]).map(async (file) => {
        const isPdf = file.mimetype === 'application/pdf';
        // const hash = generateRandomHash(16);
        // const fileName = `${Date.now()}-${hash}-dispute-evidence`;
        const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        const finalBuffer = isPdf
          ? file.buffer // No processing for PDFs
          : await sharp(file.buffer)
              .resize({ width: 720, withoutEnlargement: true })
              .webp({ quality: 60 })
              .toFormat('webp', {
                progressive: true,
              })
              .greyscale()
              .toBuffer();

        if (!IS_DEVELOPMENT) {
          // Upload to S3
          const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: `uploads/${fileName}`,
            Body: finalBuffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
          };

          const { Location } = await s3.upload(uploadParams).promise();

          return {
            fileName,
            url: Location,
          };
        } else {
          // Save to local /uploads folder
          const localPath = path.join(__dirname, '../../uploads');
          if (!fs.existsSync(localPath))
            fs.mkdirSync(localPath, { recursive: true });

          const filePath = path.join(localPath, fileName);
          fs.writeFileSync(filePath, finalBuffer);

          return {
            fileName,
            url: `http://localhost:5000/uploads/${fileName}`,
          };
        }
      }),
    );

    res.status(200).json({ message: 'Files uploaded.', files: results });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ message: 'Upload failed.', error });
  }
};
