import { User } from 'base-ca';

const buildKYCVerificationEmail = (user: User, KYCLink: string) => {
  return `<body style="margin:0; padding:50px 0; font-family:Arial,sans-serif; background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td align="center" style="padding:30px 20px; background:#ffd64d; border-top-left-radius:8px; border-top-right-radius:8px;">
        <h1 style="margin:0; color:#000; font-size:24px; font-weight:bold;">KYC Verification {{status}}</h1>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:30px 40px; color:#333; font-size:16px; line-height:24px;">
        <p style="margin:0 0 20px;">Hello <strong>${user.firstName}</strong>,</p>
        <p style="margin:0 0 30px;">
          Your KYC submission has been <strong>{{ApprovedOrRejected}}</strong>. {{AdditionalInstructions}}
        </p>
        <p style="text-align:center;">
          <a href="${KYCLink}" target="_blank"
             style="display:inline-block; padding:15px 25px; background:#000; color:#fff; text-decoration:none; border-radius:4px;">
            View KYC Dashboard
          </a>
        </p>
      </td>
    </tr>
  </table>
</body>
`;
};

export default buildKYCVerificationEmail;
