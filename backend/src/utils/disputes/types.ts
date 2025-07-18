import { Decimal } from '@prisma/client/runtime/library';
import { DisputeSeverity, DisputeType } from '@prisma/client';

export type PriorityInput = {
  fiatAmount: Decimal;
  disputeCreatedAt: Date;
  tradeCreatedAt: Date;
};

export type CalculateSlaDueDate = (trade: {
  fiatAmount: Decimal;
  paymentMethod: {
    isRisky: boolean;
  };
  vendorTrustScore: number;
}) => Date;

export type DetermineSeverity = (trade: {
  fiatAmount: Decimal;
  type: DisputeType;
  paymentMethod: {
    isRisky: boolean;
  };
  isRepeatedOffender: boolean;
}) => DisputeSeverity;
