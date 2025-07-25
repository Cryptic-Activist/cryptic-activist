import { FRONTEND_ADMIN } from '@/constants/env';

export const buildAdminInvitation = (admin: any, token: string) => {
  return `<body style="margin: 0; padding: 50px 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%"
         style="max-width: 600px; margin: 0 auto;
                background-color: #ffffff; border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <!-- Header with yellow background -->
    <tr>
      <td align="center"
          style="padding: 30px 20px; background-color: #ffd64d;
                 border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center">
              <div style="width: 40px; height: 32px; margin-bottom: 15px;">
                <!-- User icon -->
                <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTExLjUgMTJDOC4zIDExIDUgOC4yIDUgNS41QzUgMy40IDYuOSA0IDggNC41QzkuMSA0IDEwLjUgNS42IDEwLjUgNy42QzEwLjUgMTAuNyA5IDEyLjUgNy41IDE0LjUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjcuNSIgcj0iMS41Ii8+PHBhdGggZD0iTTE5IDE5LjVhNyAxLjAyIDAgMCAwLTE0IDAgNyAxLjAyIDAgMCAwIDE0IDBaIi8+PC9zdmc+" 
                     alt="User" style="display: block; width: 100%; height: 100%;">
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="margin: 0; color: #000000; font-size: 24px; font-weight: bold;">
                You're Invited to Join Cryptic Activist Admin
              </h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Content section -->
    <tr>
      <td style="padding: 30px 40px;">
        <p style="margin: 0 0 20px 0;
                  color: #333333; font-size: 16px; line-height: 24px;">
          Hi <strong>${admin.firstName} ${admin.lastName}</strong>,
        </p>
        
        <p style="margin: 0 0 30px 0;
                  color: #333333; font-size: 16px; line-height: 24px;">
          You have been invited to join the Cryptic Activist Admin panel. Please use the following link to set up your account:
        </p>
        
        <p style="margin: 0 0 30px 0; text-align: center;">
          <a href="${FRONTEND_ADMIN}/auth/set-password?token=${token}" target="_blank"
             style="display: inline-block; padding: 12px 24px; background-color: #ffd64d;
                    color: #000000; text-decoration: none; border-radius: 5px;
                    font-size: 16px; font-weight: bold;">
            Set Up Your Account
          </a>
        </p>
        
        <p style="margin: 0 0 30px 0;
                  color: #666666; font-size: 14px; line-height: 21px;">
          This invitation link will expire soon. If you have any questions, please contact support.
        </p>
        
        <p style="margin: 0;
                  color: #666666; font-size: 14px; line-height: 21px;
                  text-align: center;">
          If you have any questions, reach out to us at
          <a href="mailto:support@company.com"
             style="color: #000000; text-decoration: none;">
            support@company.com
          </a>.
        </p>
      </td>
    </tr>
    
  </table>
</body>
`;
};
