import {
  EMAIL_FROM,
  buildFirstTradeWithReferralReferee,
  buildFirstTradeWithreferralReferrer,
} from '@/services/email';

import { prisma } from '@/services/db';
import { publishToQueue } from '@/services/rabbitmq';

export const sendEmailsTrade = async (emailTrade: any) => {
  const countTraderTrades = await prisma.trade.count({
    where: {
      traderId: emailTrade?.trader.id,
      status: 'COMPLETED',
    },
  });

  let firstTradeRewardReferee = 0;
  if (countTraderTrades === 1) {
    firstTradeRewardReferee = 20;
    const referral = await prisma.referral.findFirst({
      where: {
        refereeId: emailTrade?.trader.id,
      },
      select: {
        id: true,
        referrer: {
          select: {
            id: true,
            xp: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        referee: {
          select: {
            id: true,
            xp: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (referral) {
      await prisma.user.update({
        where: {
          id: referral?.referrer.id,
        },
        data: {
          xp: {
            increment: 50,
          },
        },
      });

      const accountCreateWithReferralReferrerEmailBody =
        buildFirstTradeWithreferralReferrer(
          referral.referrer,
          referral.referee,
          emailTrade,
          50,
        );
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: referral.referrer.email,
            name: `${referral.referrer.firstName} ${referral.referrer.lastName}`,
          },
        ],
        subject: 'Account creation - Cryptic Activist',
        html: accountCreateWithReferralReferrerEmailBody,
        text: 'Account creation',
      });

      const accountCreateWithReferralRefereeEmailBody =
        buildFirstTradeWithReferralReferee(referral.referee, emailTrade, 20);
      await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: referral.referee.email,
            name: `${referral.referee.firstName} ${referral.referee.lastName}`,
          },
        ],
        subject: 'Account creation - Cryptic Activist',
        html: accountCreateWithReferralRefereeEmailBody,
        text: 'Account creation',
      });
    }
  }

  return { firstTradeRewardReferee };
};

export const updateAddXPTier = async (
  emailTrade: any,
  firstTradeRewardReferee: number,
) => {
  const vendorUpdated = await prisma.user.update({
    where: {
      id: emailTrade?.vendor?.id,
    },
    data: {
      xp: {
        increment: 100,
      },
    },
    select: {
      xp: true,
    },
  });
  const traderUpdated = await prisma.user.update({
    where: {
      id: emailTrade?.trader?.id,
    },
    data: {
      xp: {
        increment: 100 + firstTradeRewardReferee,
      },
    },
  });
  const nextVendorTier = await prisma.tier.findFirst({
    where: {
      requiredXP: {
        gte: vendorUpdated.xp,
      },
    },
    select: {
      id: true,
      requiredXP: true,
    },
  });
  const nextTraderTier = await prisma.tier.findFirst({
    where: {
      requiredXP: {
        gte: traderUpdated.xp,
      },
    },
    select: {
      id: true,
      requiredXP: true,
    },
  });
  console.log({ nextVendorTier, vendorUpdated });
  if (nextVendorTier && vendorUpdated.xp >= nextVendorTier?.requiredXP) {
    await prisma.user.update({
      where: {
        id: emailTrade?.vendor?.id,
      },
      data: {
        tierId: nextVendorTier.id,
      },
    });
  }
  if (nextTraderTier && vendorUpdated.xp >= nextTraderTier?.requiredXP) {
    await prisma.user.update({
      where: {
        id: emailTrade?.vendor?.id,
      },
      data: {
        tierId: nextTraderTier.id,
      },
    });
  }
};
