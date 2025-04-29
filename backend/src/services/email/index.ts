import { SMTP_USER } from '@/constants/env';
import { SendEmailParams } from './types';
import { transporter } from '@/config/nodemailer';

export * from './templates';

export const EMAIL_FROM = {
  MAIN: SMTP_USER,
  ACCOUNT: 'accounts@crypticactivist.com',
} as const;

export type EMAIL_FROM = (typeof EMAIL_FROM)[keyof typeof EMAIL_FROM];

export const sendEmail = async (params: SendEmailParams) => {
  try {
    const info = await transporter.sendMail({
      from: params.from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });

    return info.messageId;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
