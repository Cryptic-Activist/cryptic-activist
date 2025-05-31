import {
  MAILTRAP_SEND_EMAIL_API,
  MAILTRAP_TESTINBOX_ID,
  MAILTRAP_TOKEN,
} from '@/constants/env';

import { SendEmailParams } from './types';
import { fetchPost } from '../axios';

export * from './templates';

export const EMAIL_FROM = {
  MAIN: {
    name: 'Cryptic Activist',
    email: 'company@crypticactivist.com',
  },
  ACCOUNT: {
    name: 'Cryptic Activist Account',
    email: 'account@crypticactivist.com',
  },
  TRADE: {
    name: 'Cryptic Activist Trade',
    email: 'trade@crypticactivist.com',
  },
  SUPPORT: {
    name: 'Cryptic Activist Support',
    email: 'support@crypticactivist.com',
  },
} as const;

export type EMAIL_FROM = (typeof EMAIL_FROM)[keyof typeof EMAIL_FROM];

export const sendEmail = async (params: SendEmailParams) => {
  try {
    const response = await fetchPost(
      MAILTRAP_SEND_EMAIL_API + MAILTRAP_TESTINBOX_ID,
      {
        ...params,
      },
      {
        Authorization: `Bearer ${MAILTRAP_TOKEN}`,
      },
    );

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
