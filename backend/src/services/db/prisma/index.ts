import { Prisma, PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export type BatchPayload = Prisma.BatchPayload;

export const Decimal = Prisma.Decimal;
