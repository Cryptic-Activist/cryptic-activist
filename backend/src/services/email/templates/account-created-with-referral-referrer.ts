import { FRONTEND_PUBLIC } from '@/constants/env';

const accountCreateWithReferralReferrerEmail = (
  referrer: any,
  newUser: any,
  referralCode: string,
) => {
  const rewardsLink = `${FRONTEND_PUBLIC}/rewards`;
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
                <!-- Celebration icon -->
                <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMiAxQTExIDEgMCAxIDEyIDIzYTEgMSAwIDAgMSAwLTIyem0wIDE4YTEgMSAwIDEgMCAwLTJhMSAxIDAgMCAwIDAgMnoiLz48cGF0aCBkPSJNMTEgMTBsMyAyIDMtMiIvPjwvc3ZnPg==" 
                     alt="Celebration" style="display: block; width: 100%; height: 100%;">
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="margin: 0; color: #000000; font-size: 24px; font-weight: bold;">
                You've Earned a Reward!
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
          Hi <strong>${referrer.firstName} ${referrer.lastName}</strong>,
        </p>
        
        <p style="margin-top: 0; margin-bottom: 30px;
                  color: #333333; font-size: 16px; line-height: 24px;">
          Great news! <strong>${newUser.firstName} ${newUser.lastName}</strong> just created an account using your referral code <strong>${referralCode}</strong>.
        </p>
        
        <p style="margin-top: 0; margin-bottom: 30px;
                  color: #333333; font-size: 16px; line-height: 24px;">
          As a thank‑you, we’ve credited your account with your reward. You can log in now to see your updated balance and explore more ways to earn.
        </p>
        
        <!-- CTA Button -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 10px 0 30px 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#ffd64d" style="border-radius: 4px;">
                    <a href="${rewardsLink}" target="_blank"
                       style="display: inline-block; padding: 15px 25px;
                              font-size: 16px; color: #000000;
                              text-decoration: none; border-radius: 4px;
                              font-weight: bold;">
                      View My Rewards
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
          <a href="${rewardsLink}" style="color: #000000; text-decoration: none;">
            ${rewardsLink}
          </a>
        </p>
        
        <p style="margin-top: 0; margin-bottom: 0;
                  color: #666666; font-size: 14px; line-height: 21px;
                  text-align: center;">
          Questions? Reach out to our support team at
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

export default accountCreateWithReferralReferrerEmail;
