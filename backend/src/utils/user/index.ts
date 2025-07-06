import { User } from '@prisma/client';
import { prisma } from '@/services/db';

export const calculateTrustScore = async (user: User) => {
  // Weight constants
  const WEIGHTS = {
    completedTrade: 2,
    lostDispute: 5,
    feedbackRating: 10,
    trustedBy: 1,
    abuseFlag: 10,
    accountAgeMonth: 1,
  };

  const completedTrades = await prisma.trade.count({
    where: {
      status: 'COMPLETED',
    },
  });
  const lostDisputes = await prisma.tradeDispute.count({
    where: {
      loserId: user.id,
    },
  });
  const avgFeedbackRating = await getAverageFeedbackForUserOffers(user.id);
  const trustedByCount = await prisma.trust.count({
    where: {
      trustedId: user.id,
    },
  });
  const accountAgeInMonths = await getAccountAgeInMonths(user.id);

  // Extract metrics
  const completedPoints = completedTrades * WEIGHTS.completedTrade;
  const disputePenalty = lostDisputes * WEIGHTS.lostDispute;
  const feedbackPoints = (avgFeedbackRating || 0) * WEIGHTS.feedbackRating;
  const trustedByPoints = trustedByCount * WEIGHTS.trustedBy;
  // const abusePenalty = user.confirmedAbuseFlags * WEIGHTS.abuseFlag;
  const ageBonus = accountAgeInMonths * WEIGHTS.accountAgeMonth;

  // Calculate total score
  const rawScore =
    completedPoints +
    feedbackPoints +
    trustedByPoints +
    ageBonus -
    disputePenalty;
  // abusePenalty;

  // Clamp between 0 and 100
  const trustScore = Math.max(0, Math.min(100, rawScore));

  return trustScore;
};

export const getAverageFeedbackForUserOffers = async (userId: string) => {
  const result = await prisma.$queryRawUnsafe<
    { average_rating: number | null }[]
  >(
    `
  SELECT 
    AVG(
      CASE tf.type
        WHEN 'NEGATIVE' THEN -1
        WHEN 'NEUTRAL' THEN 0
        WHEN 'POSITIVE' THEN 1
      END
    ) AS average_rating
  FROM "Offer" o
  JOIN "Trade" t ON t."offerId" = o.id
  JOIN "TradeFeedback" tf ON tf."tradeId" = t.id
  WHERE o."vendorId" = $1
`,
    userId,
  );

  const avgRating = result[0]?.average_rating ?? null;

  return avgRating;
};

export const getAccountAgeInMonths = async (userId: string) => {
  const result = await prisma.$queryRawUnsafe<{ account_age_months: number }[]>(
    `
  SELECT DATE_PART('year', AGE(NOW(), "createdAt")) * 12 + 
         DATE_PART('month', AGE(NOW(), "createdAt")) AS account_age_months
  FROM "User"
  WHERE id = $1
`,
    userId,
  );

  const ageInMonths = result[0]?.account_age_months ?? 0;
  return ageInMonths;
};

export const isUserPremium = async (userId: string) => {
  const now = new Date();

  const activePremium = await prisma.premiumPurchase.findFirst({
    where: {
      userId,
      status: 'COMPLETED',
      expiresAt: {
        gte: now,
      },
    },
  });

  return !!activePremium;
};
