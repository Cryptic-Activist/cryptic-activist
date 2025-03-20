import { BatchPayload, Block, prisma } from '../../services/prisma';
import {
  CreateBlock,
  CreateManyBlocks,
  DeleteBlockParams,
  GetBlockParams,
  GetBlocksPaginationParams,
  GetBlocksParams,
  UpdateBlockParams,
  WhereBlock,
} from './types';

export const createBlock = async (
  params: CreateBlock
): Promise<Block> => {
  try {
    const block = await prisma.block.findFirst({
      where: params as WhereBlock,
    });

    if (block) {
      return block;
    }

    const newBlock = await prisma.block.create({
      data: params,
    });

    return newBlock;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyBlocks = async (
  params: CreateManyBlocks[]
): Promise<BatchPayload> => {
  try {
    const newBlocks = await prisma.block.createMany({
      data: params,
    });

    return newBlocks;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateBlock = async ({
  toUpdate,
  where,
}: UpdateBlockParams): Promise<Block> => {
  const updated = await prisma.block.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteBlock = async ({
  where,
}: DeleteBlockParams): Promise<Block> => {
  const deleted = await prisma.block.delete({
    where,
  });
  return deleted;
};

export const getBlock = async ({
  where,
  select,
}: GetBlockParams): Promise<Block | null> => {
  const block = await prisma.block.findFirst({
    ...(select && { select }),
    where,
  });

  if (!block) {
    return null;
  }

  return block;
};

export const getBlocks = async ({
  limit,
  where,
  select,
}: GetBlocksParams): Promise<Block[]> => {
  const blocks = await prisma.block.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return blocks;
};

export const getBlocksPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetBlocksPaginationParams): Promise<Block[]> => {
  const blocks = await prisma.block.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return blocks;
};
