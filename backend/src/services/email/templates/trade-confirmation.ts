import '@formatjs/intl-durationformat';

import { Trade, User } from 'base-ca';

import { FRONTEND_PUBLIC } from '@/constants/env';
import { getCoinPrice } from '@/services/coinGecko';
import { getDuration } from '@/utils/date';
import { toUpperCase } from '@/utils/string';

const buildTradeConfirmationEmail = async (user: User, trade: Trade) => {
  const tradeDetailsUrl = `${FRONTEND_PUBLIC}/trade/${trade.id}/details`;
  const pricePerUnit = await getCoinPrice(
    trade.cryptocurrency?.coingeckoId,
    trade.fiat?.symbol,
  );
  const duration = getDuration(trade.startedAt, trade.endedAt!);

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
                <!-- Success icon -->
                <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTE4IDgsNiAxNCIvPjwvc3ZnPg==" 
                     alt="Check" style="display: block; width: 100%; height: 100%;">
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="margin: 0; color: #000000; font-size: 24px; font-weight: bold;">
                Trade Executed Successfully
              </h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Content section -->
    <tr>
      <td style="padding: 30px 40px;">
        <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 24px;">
          Hi <strong>${user.firstName} ${user.lastName}</strong>,
        </p>
        
        <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 24px;">
          Your trade has been successfully completed. Below are the full details:
        </p>
        
        <!-- Trade Details -->
        <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Trade ID:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${trade.id}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Executed At:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${trade.endedAt}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Duration:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${duration.formatted}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Vendor:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${trade.vendor.firstName} ${trade.vendor.lastName} (${trade.vendor.username})
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Type:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${trade.offer.offerType}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Crypto:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${trade.cryptocurrencyAmount} ${toUpperCase(trade.cryptocurrency?.symbol)}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Fiat:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${trade.fiatAmount} ${toUpperCase(trade.fiat.symbol)}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Price / Unit:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${pricePerUnit} ${toUpperCase(trade.fiat.symbol)}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Payment Method:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${trade.paymentMethod.name}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              <strong>Status:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 15px; color: #333;">
              ${trade.status}
            </td>
          </tr>
        </table>
        
        <!-- View Details Button -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 10px 0 30px 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#ffd64d" style="border-radius: 4px;">
                    <a href="${tradeDetailsUrl}" target="_blank"
                       style="display: inline-block; padding: 15px 25px;
                              font-size: 16px; color: #000000;
                              text-decoration: none; border-radius: 4px;
                              font-weight: bold;">
                      View Trade Details
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 21px; text-align: center;">
          If you have any questions, please contact our support team at
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

export default buildTradeConfirmationEmail;
