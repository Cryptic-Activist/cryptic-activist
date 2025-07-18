import { CalculateSlaDueDate, DetermineSeverity } from './types';
import { DisputePriority, DisputeSeverity } from '@prisma/client';

import { Decimal } from '@/services/db';

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
  if (fiatAmount.gte(1000)) {
    severity = DisputeSeverity.HIGH;
  }

  // Extremely high value
  if (fiatAmount.gte(5000)) {
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

export const mapPriorityScoreToLevel = (
  priorityScore: number,
): DisputePriority => {
  if (priorityScore >= 90) return 'CRITICAL';
  if (priorityScore >= 70) return 'HIGH';
  if (priorityScore >= 40) return 'MEDIUM';
  return 'LOW';
};

export const calculateSlaDueDate: CalculateSlaDueDate = (trade) => {
  const now = new Date();
  let slaHours = 24; // Base SLA for normal trades

  // Urgency based on fiat amount
  if (trade.fiatAmount.gte(2000)) {
    slaHours = 12; // High-value → moderate urgency
  } else if (trade.fiatAmount.gte(1000)) {
    slaHours = 16;
  } else if (trade.fiatAmount.gte(250)) {
    slaHours = 20;
  }

  // Risky payment methods → tighter response time
  if (trade.paymentMethod.isRisky) {
    slaHours = Math.min(slaHours, 16);
  }

  // Vendor trust adjustment
  if (trade.vendorTrustScore && trade.vendorTrustScore < 40) {
    slaHours -= 2;
  } else if (trade.vendorTrustScore && trade.vendorTrustScore < 70) {
    slaHours -= 1;
  }

  // Ensure minimum SLA of 12 hours
  slaHours = Math.max(slaHours, 12);

  return new Date(now.getTime() + slaHours * 60 * 60 * 1000);
};
