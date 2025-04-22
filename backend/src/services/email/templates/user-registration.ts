import { FRONTEND_PUBLIC } from '@/constants/env';
import { User } from 'base-ca';

const buildVerifyAccountEmail = (user: User, token: string) => {
  const activationUrl = `${FRONTEND_PUBLIC}/account/verify/${token}`;

  return `<body style="margin: 0; padding: 50px 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- Header with yellow background -->
        <tr>
            <td align="center" style="padding: 30px 20px; background-color: #ffd64d; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center">
                            <div style="width: 40px; height: 32px; margin-bottom: 15px;">
                                <!-- Email icon -->
                                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHJ4PSIyIi8+PHBhdGggZD0iTTIyIDdMMTIgMTQgMiA3Ii8+PC9zdmc+" alt="Email" style="display: block; width: 100%; height: 100%;">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <h1 style="margin: 0; color: #000000; font-size: 24px; font-weight: bold;">Verify Your Email</h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Content section -->
        <tr>
            <td style="padding: 30px 40px;">
                <p style="margin-top: 0; margin-bottom: 20px; color: #333333; font-size: 16px; line-height: 24px;">Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
                
                <p style="margin-top: 0; margin-bottom: 30px; color: #333333; font-size: 16px; line-height: 24px;">Thank you for creating an account with us. To get started, please verify your email address by clicking the button below:</p>
                
                <!-- CTA Button -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="padding: 10px 0 30px 0;">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" bgcolor="#ffd64d" style="border-radius: 4px;">
                                        <a href="${activationUrl}" target="_blank" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #000000; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email Address</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                
                <p style="margin-top: 0; margin-bottom: 30px; color: #666666; font-size: 14px; line-height: 21px;">If the button above doesn't work, you can copy and paste this link into your browser:</p>
                
                <p style="margin-top: 0; margin-bottom: 30px; font-size: 14px; line-height: 21px;">
                    <a href="${activationUrl}" style="color: #000000; text-decoration: none; word-break: break-all;">${activationUrl}</a>
                </p>
                
                <p style="margin-top: 0; margin-bottom: 0; color: #666666; font-size: 14px; line-height: 21px; text-align: center;">Need help? Contact our support team at <a href="mailto:support@company.com" style="color: #000000; text-decoration: none;">support@company.com</a></p>
            </td>
        </tr>
    </table>
</body>`;
};

export default buildVerifyAccountEmail;
