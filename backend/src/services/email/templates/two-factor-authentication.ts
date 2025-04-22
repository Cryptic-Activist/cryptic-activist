const buildTwofactorAuthentication = (otpCode: string) => {
  return `<body style="margin:0; padding:50px 0; font-family:Arial,sans-serif; background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td align="center" style="padding:30px 20px; background:#ffd64d; border-top-left-radius:8px; border-top-right-radius:8px;">
        <h1 style="margin:0; color:#000; font-size:24px; font-weight:bold;">Your Verification Code</h1>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:30px 40px; text-align:center; color:#333; font-size:16px; line-height:24px;">
        <p style="margin:0 0 20px;">Use the following one‑time code to complete your action:</p>
        <p style="font-size:32px; letter-spacing:4px; margin:0 0 15px;">${otpCode}</p>
        <p style="margin:0; font-size:14px; color:#777;">Expires in 10 minutes</p>
      </td>
    </tr>
  </table>
</body>`;
};

export default buildTwofactorAuthentication;
