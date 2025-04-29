import { SMTP_HOST, SMTP_PASS, SMTP_USER } from '@/constants/env';

import { IS_DEVELOPMENT } from '@/constants';
import nodemailer from 'nodemailer';

const port = IS_DEVELOPMENT ? 587 : 465;
const secure = IS_DEVELOPMENT ? false : true;

console.log({
  host: SMTP_HOST,
  port, // 465 for SSL
  secure, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port, // 465 for SSL
  secure, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});
