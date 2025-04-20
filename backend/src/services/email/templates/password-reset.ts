import { FRONTEND_PUBLIC } from '@/constants/env';
import { User } from 'base-ca';

const buildPasswordResetEmail = (user: User, token: string) => {
  const url = `${FRONTEND_PUBLIC}/account/password/reset/${token}`;
  return `<div>
    <h1>Reset your password</h1>
    <p>Hi ${user.firstName} ${user.lastName},</p>
    <p>We received a request to reset your password. Click the link below to set a new password:</p>
    <a href="${url}">Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Thanks,</p>
    <p>The Team</p>
  </div>`;
};

export default buildPasswordResetEmail;
