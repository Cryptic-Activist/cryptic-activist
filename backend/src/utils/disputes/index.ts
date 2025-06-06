import { CalculateSlaDueDate, DetermineSeverity } from './types';

import { DisputeSeverity } from '@prisma/client';

const severityRank: Record<DisputeSeverity, number> = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  CRITICAL: 3,
};

const maxSeverity = (
  a: DisputeSeverity,
  b: DisputeSeverity,
): DisputeSeverity => {
  return severityRank[a] >= severityRank[b] ? a : b;
};

export const determineSeverity: DetermineSeverity = (
  context,
): DisputeSeverity => {
  const { fiatAmount, type, paymentMethod, isRepeatedOffender } = context;

  // Start with MEDIUM
  let severity: DisputeSeverity = DisputeSeverity.MEDIUM;

  // High value trades
  if (fiatAmount >= 1000) {
    severity = DisputeSeverity.HIGH;
  }

  // Extremely high value
  if (fiatAmount >= 5000) {
    severity = DisputeSeverity.CRITICAL;
  }

  // Severe issue type
  if (
    type === 'PAYMENT_FRAUD' ||
    type === 'SCAM' ||
    type === 'SUSPICIOUS_ACTIVITY'
  ) {
    severity = maxSeverity(severity, DisputeSeverity.HIGH);
  }

  // Risky payment methods
  if (paymentMethod.isRisky) {
    severity = maxSeverity(severity, DisputeSeverity.HIGH);
  }

  // Repeat offender = escalate to CRITICAL
  if (isRepeatedOffender) {
    severity = DisputeSeverity.CRITICAL;
  }

  return severity;
};

export const determinePriority = (
  severity: DisputeSeverity,
  trustScore: number,
) => {
  let basePriority = 0;

  switch (severity) {
    case 'CRITICAL':
      basePriority = 100;
      break;
    case 'HIGH':
      basePriority = 75;
      break;
    case 'MEDIUM':
      basePriority = 50;
      break;
    case 'LOW':
      basePriority = 25;
      break;
  }

  // Boost priority if user is low-trust
  if (trustScore < 40) basePriority += 10;

  return basePriority;
};

export const calculateSlaDueDate: CalculateSlaDueDate = (trade) => {
  const now = new Date();
  let slaHours = 6; // default

  if (trade.fiatAmount >= 1000) {
    slaHours = 2; // urgent
  } else if (trade.fiatAmount >= 250) {
    slaHours = 4;
  }

  // Risky payment methods
  if (trade.paymentMethod.isRisky) {
    slaHours = Math.min(slaHours, 3);
  }

  // Low trust vendor
  if (trade.vendorTrustScore && trade.vendorTrustScore < 50) {
    slaHours -= 1;
  }

  return new Date(now.getTime() + slaHours * 60 * 60 * 1000);
};
