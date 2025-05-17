import { FRONTEND_PUBLIC } from '@/constants/env';

const accountCreateWithReferralRefereeEmail = (
  user: any,
  referrerName: string,
  referralCode: string,
) => {
  const loginUrl = `${FRONTEND_PUBLIC}?login=1`;
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
                <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEyIDEyYy0zLjMxIDAtNiAyLjY5LTYgNnYxYDEgMSAwIDAgMCAxLTEgMSAxIDAgMCAwIDAgMWg4YTEgMSAwIDAgMCAwLTF2LTFjMC0zLjMxLTIuNjktNi02LTZ6bTAgNmEyIDIgMCAxIDEgMC00IDIgMiAwIDAgMSAwIDR6Ii8+PC9zdmc+" 
                     alt="User" style="display: block; width: 100%; height: 100%;">
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="margin: 0; color: #000000; font-size: 24px; font-weight: bold;">
                Welcome to Your New Account!
              </h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Content section -->
    <tr>
      <td style="padding: 30px 40px;">
        <p style="margin-top: 0; margin-bottom: 20px;
                  color: #333333; font-size: 16px; line-height: 24px;">
          Hi <strong>${user.firstName} ${user.lastName}</strong>,
        </p>
        
        <p style="margin-top: 0; margin-bottom: 30px;
                  color: #333333; font-size: 16px; line-height: 24px;">
          Your account was created successfully using the referral code from <strong>${referrerName}</strong>!
        </p>
        
        <p style="margin-top: 0; margin-bottom: 30px;
                  color: #333333; font-size: 16px; line-height: 24px;">
          Here’s your referral code to share with friends and earn rewards:  
          <span style="display:inline-block; margin-top:10px; font-size:18px; font-family:monospace; color:#000;">
            ${referralCode}
          </span>
        </p>
        
        <!-- CTA Button -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 10px 0 30px 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#ffd64d" style="border-radius: 4px;">
                    <a href="${loginUrl}" target="_blank"
                       style="display: inline-block; padding: 15px 25px;
                              font-size: 16px; color: #000000;
                              text-decoration: none; border-radius: 4px;
                              font-weight: bold;">
                      Log In to Your Account
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <p style="margin-top: 0; margin-bottom: 30px;
                  color: #666666; font-size: 14px; line-height: 21px;">
          If the button above doesn’t work, copy and paste this link into your browser:
        </p>
        
        <p style="margin-top: 0; margin-bottom: 30px;
                  font-size: 14px; line-height: 21px; word-break: break-all;">
          <a href="${loginUrl}" style="color: #000000; text-decoration: none;">
            ${loginUrl}
          </a>
        </p>
        
        <p style="margin-top: 0; margin-bottom: 0;
                  color: #666666; font-size: 14px; line-height: 21px;
                  text-align: center;">
          Have questions? Reach out to our support team at
          <a href="mailto:support@company.com"
             style="color: #000000; text-decoration: none;">
            support@company.com
          </a>
        </p>
      </td>
    </tr>
    
  </table>
</body>`;
};

export default accountCreateWithReferralRefereeEmail;
