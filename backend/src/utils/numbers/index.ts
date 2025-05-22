import { Prisma } from '@/services/db/prisma';

export const toPrismaDecimal = (value: number | string) =>
  new Prisma.Decimal(value);
