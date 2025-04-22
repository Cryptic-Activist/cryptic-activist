import { FRONTEND_PUBLIC } from '@/constants/env';

const buildSecurityAlertNewLoginDeviceEmail = (login: any) => {
  const resetLink = FRONTEND_PUBLIC + '?reset-password=1';
  return `<body style="margin:0; padding:50px 0; font-family:Arial,sans-serif; background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td align="center" style="padding:30px 20px; background:#ffd64d; border-top-left-radius:8px; border-top-right-radius:8px;">
        <h1 style="margin:0; color:#000; font-size:24px; font-weight:bold;">New Login Detected</h1>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:30px 40px; color:#333; font-size:16px; line-height:24px;">
        <p style="margin:0 0 20px;">We noticed a login from a new device:</p>
        <ul style="padding-left:20px; margin:0 0 30px; color:#333; font-size:15px;">
          <li><strong>Location:</strong> ${login.location}</li>
          <li><strong>IP Address:</strong> ${login.ip}</li>
          <li><strong>Time:</strong> ${login.timestamp}</li>
        </ul>
        <p style="margin:0;">
          If this wasn't you, <a href="${resetLink}" style="color:#000; text-decoration:underline;">reset your password</a> immediately.
        </p>
      </td>
    </tr>
  </table>
</body>
`;
};

export default buildSecurityAlertNewLoginDeviceEmail;
