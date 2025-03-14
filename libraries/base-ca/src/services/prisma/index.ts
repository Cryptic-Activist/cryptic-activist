import {
  AcceptedCryptocurrency,
  Admin,
  Block,
  Chat,
  Cryptocurrency,
  Feedback,
  Fiat,
  Language,
  Offer,
  PaymentMethod,
  PaymentMethodCategory,
  PaymentReceipt,
  Prisma,
  PrismaClient,
  SystemMessage,
  Trade,
  Trust,
  User,
  UserLanguage,
} from '@prisma/client';

export const prisma = new PrismaClient();

export type BatchPayload = Prisma.BatchPayload;

export {
  User,
  Block,
  Trust,
  Chat,
  Cryptocurrency,
  Feedback,
  Fiat,
  Language,
  Offer,
  PaymentMethod,
  PaymentMethodCategory,
  PaymentReceipt,
  Trade,
  UserLanguage,
  SystemMessage,
  Admin,
  AcceptedCryptocurrency,
};
