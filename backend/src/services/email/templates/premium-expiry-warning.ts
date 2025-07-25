import { User } from "@prisma/client";

export default function buildPremiumExpiryWarningEmail(user: User) {
  return `
    <p>Hello ${user.firstName},</p>
    <p>Your premium subscription is expiring soon.</p>
    <p>Please renew your subscription to continue enjoying premium benefits.</p>
    <p>Thanks,</p>
    <p>The Cryptic Activist Team</p>
  `;
}
