import { DisputeSeverity, DisputeType } from '@prisma/client';

export type PriorityInput = {
  fiatAmount: number;
  disputeCreatedAt: Date;
  tradeCreatedAt: Date;
};

export type CalculateSlaDueDate = (trade: {
  fiatAmount: number;
  paymentMethod: {
    isRisky: boolean;
  };
  vendorTrustScore: number;
}) => Date;

export type DetermineSeverity = (trade: {
  fiatAmount: number;
  type: DisputeType;
  paymentMethod: {
    isRisky: boolean;
  };
  isRepeatedOffender: boolean;
}) => DisputeSeverity;
