import { FRONTEND_PUBLIC } from '@/constants/env';

const buildTradeDisputeMoreEvidencesRequestEmail = (trade: any, user: any) => {
  const tradeUrl = `${FRONTEND_PUBLIC}/trade/${trade.id}/details`;

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
        <h1 style="margin: 0; color: #000000; font-size: 24px; font-weight: bold;">
          User Warning Issued
        </h1>
      </td>
    </tr>

    <!-- Content section -->
    <tr>
      <td style="padding: 30px 40px;">
        <p style="margin:0 0 20px;color:#333333;font-size:16px;line-height:24px;">
          Hi <strong>${user?.firstName} ${user?.lastName}</strong>,
        </p>
        <p style="margin:0 0 20px;color:#333333;font-size:16px;line-height:24px;">
          It seems that the evidences you have presented on yuor trade dispute were not enough. The moderator is requesting for more evidences for your dispute.
        </p>


        <!-- CTA Button -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding:10px 0 30px 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#ffd64d" style="border-radius:4px;">
                    <a href="${tradeUrl}" target="_blank"
                       style="display:inline-block;padding:15px 25px;
                              font-size:16px;color:#000000;
                              text-decoration:none;border-radius:4px;
                              font-weight:bold;">
                      Go to Trade Details Page
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <p style="margin:0;color:#666666;font-size:14px;line-height:21px;">
          If the button above doesn't work, copy and paste this link into your browser:
        </p>
        <p style="margin:0 0 30px;color:#666666;font-size:14px;line-height:21px;word-break:break-all;">
          <a href="${tradeUrl}" style="color:#000000;text-decoration:none;">
            ${tradeUrl}
          </a>
        </p>

        <p style="margin:0;color:#666666;font-size:14px;line-height:21px;text-align:center;">
          Need help? Contact our support team at
          <a href="mailto:support@company.com" style="color:#000000;text-decoration:none;">
            support@company.com
          </a>
        </p>
      </td>
    </tr>

  </table>
</body>`;
};

export default buildTradeDisputeMoreEvidencesRequestEmail;
