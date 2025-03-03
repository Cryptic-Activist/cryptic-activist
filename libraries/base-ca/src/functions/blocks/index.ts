import { Block, prisma } from '@/services/prisma';

import type {
  BlockAssociationsType,
  CreateBlockParamsType,
  DeleteBlockWhereType,
  GetBlockWhereType,
  UpdateBlockToUpdateType,
  UpdateBlockWhereType,
} from './types';

export const createBlock = async (
  params: CreateBlockParamsType
): Promise<Block> => {
  try {
    const block = await prisma.block.findFirst({
      where: params,
    });

    if (block) {
      return block;
    }

    const newBlock = await prisma.block.create({ data: params });

    return newBlock;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateBlock = async (
  where: UpdateBlockWhereType,
  toUpdate: UpdateBlockToUpdateType
): Promise<Block> => {
  const updated = await prisma.block.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteBlock = async (
  where: DeleteBlockWhereType
): Promise<Block> => {
  const deleted = await prisma.block.delete({ where });
  return deleted;
};

export const getBlock = async (
  where: GetBlockWhereType,
  associations: BlockAssociationsType
): Promise<Block | null> => {
  const block = await prisma.block.findFirst({
    where,
    include: associations,
  });

  if (!block) {
    return null;
  }

  return block;
};

export const getBlocks = async (
  associations: BlockAssociationsType,
  where?: GetBlockWhereType,
  limit?: number
): Promise<Block[]> => {
  const blocks = await prisma.block.findMany({
    where,
    include: associations,
    take: limit,
  });

  return blocks;
};

export const getBlocksPagination = async (
  associations: BlockAssociationsType,
  limit: number,
  offset: number,
  where?: GetBlockWhereType
): Promise<Block[]> => {
  const blocks = await prisma.block.findMany({
    take: limit,
    skip: offset,
    where,
    include: associations,
  });

  return blocks;
};

export const countBlocks = async (
  where?: GetBlockWhereType
): Promise<number> => {
  const blocks = await prisma.block.findMany({ where });

  return blocks.length;
};
