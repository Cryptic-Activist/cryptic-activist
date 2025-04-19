import { FRONTEND_PUBLIC } from '@/constants/env';
import { User } from 'base-ca';

const buildPasswordResetEmail = (user: User) => {
  const url = `${FRONTEND_PUBLIC}/account/password-reset/${user.id}`;
  return `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333;">Verify Your Account</h2>
      <p style="color: #555;">
        Thank you for registering! To complete your registration, please click the link below to verify your account:
      </p>
      <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 10px;">
          <strong>First Name:</strong> ${user.firstName}
        </li>
        <li style="margin-bottom: 10px;">
          <strong>Last Name:</strong> ${user.lastName}
        </li>
        <li style="margin-bottom: 10px;">
          <strong>Username:</strong> ${user.username}
        </li>
        <li style="margin-bottom: 10px;">
          <strong>Email:</strong> ${user.email}
        </li>
      </ul>
      <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
        Verify Account
      </a>
      <p style="color: #555;">
        If you did not create an account, please ignore this email.
      </p>
      <p style="color: #555;">
        Best regards,<br />
        The Cryptic Activist Team
      </p>
    </div>`;
};

export default buildPasswordResetEmail;
