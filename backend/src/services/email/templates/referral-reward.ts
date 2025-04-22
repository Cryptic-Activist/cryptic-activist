import { FRONTEND_PUBLIC } from '@/constants/env';
import { User } from 'base-ca';

const buildReferralRewardEmail = (
  user: User,
  friend: User,
  reward: any,
  referralToken: string,
) => {
  const referralLink = FRONTEND_PUBLIC + '?referral=' + referralToken;
  return `<body style="margin:0; padding:50px 0; font-family:Arial,sans-serif; background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td align="center" style="padding:30px 20px; background:#ffd64d; border-top-left-radius:8px; border-top-right-radius:8px;">
        <h1 style="margin:0; color:#000; font-size:24px; font-weight:bold;">You Earned a Referral Reward!</h1>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:30px 40px; color:#333; font-size:16px; line-height:24px;">
        <p style="margin:0 0 20px;">Congrats <strong>${user.firstName}</strong>,</p>
        <p style="margin:0 0 30px;">
          Your friend <strong>${friend.email}</strong> completed their first trade! You've received <strong>${reward.amount} ${reward.currency}</strong>.
        </p>
        <p style="text-align:center;">
          <a href="${referralLink}" target="_blank"
             style="display:inline-block; padding:15px 25px; background:#000; color:#fff; text-decoration:none; border-radius:4px;">
            Share Your Referral Link
          </a>
        </p>
      </td>
    </tr>
  </table>
</body>
`;
};

export default buildReferralRewardEmail;
