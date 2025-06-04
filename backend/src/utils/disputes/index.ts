import { DisputePriority } from '@prisma/client';

type PriorityInput = {
  fiatAmount: number;
  disputeCreatedAt: Date;
  tradeCreatedAt: Date;
};

export const calculateDisputePriority = ({
  fiatAmount,
  disputeCreatedAt,
  tradeCreatedAt,
}: PriorityInput): DisputePriority => {
  const hoursSinceDispute =
    (Date.now() - disputeCreatedAt.getTime()) / (1000 * 60 * 60);
  const tradeAgeHours =
    (Date.now() - tradeCreatedAt.getTime()) / (1000 * 60 * 60);

  if (fiatAmount >= 10000 || hoursSinceDispute > 72 || tradeAgeHours > 96) {
    return 'CRITICAL';
  }

  if (fiatAmount >= 5000 || hoursSinceDispute > 48 || tradeAgeHours > 72) {
    return 'HIGH';
  }

  if (fiatAmount >= 1000 || hoursSinceDispute > 24) {
    return 'MEDIUM';
  }

  return 'LOW';
};
