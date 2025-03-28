import { Prisma } from '@prisma/client';

export type GetParamsRemappingParams =
  | Prisma.OfferWhereInput
  | Prisma.AcceptedCryptocurrencyWhereInput
  | Prisma.ChatWhereInput
  | Prisma.FiatWhereInput
  | Prisma.UserWhereInput
  | Prisma.AdminWhereInput
  | Prisma.BlockWhereInput
  | Prisma.OfferWhereInput
  | Prisma.TradeWhereInput
  | Prisma.TrustWhereInput
  | Prisma.FeedbackWhereInput
  | Prisma.LanguageWhereInput;
