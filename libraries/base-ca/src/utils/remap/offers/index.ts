import {
  CreateOfferParams,
  GetOfferWhereType,
  UpdateOfferToUpdateType,
  UpdateTradeInstructionsTagsPrismaType,
} from '../../../functions/offers/types';

export const createParamsRemapping = (params?: CreateOfferParams) => {
  if (!params) {
    return;
  }

  const { tradeInstructionsTags, ...rest } = params;

  return {
    ...(tradeInstructionsTags && {
      tradeInstructionsTags: {
        // @ts-check
        hasEvery: [...(tradeInstructionsTags as string[])],
      },
    }),
    ...rest,
  };
};

export const updateParamsRemapping = (
  params: UpdateOfferToUpdateType
) => {
  const { tradeInstructionsTags, ...rest } = params;

  return {
    tradeInstructionsTags:
      tradeInstructionsTags as UpdateTradeInstructionsTagsPrismaType,
    ...rest,
  };
};

export const getParamsRemapping = (params?: GetOfferWhereType) => {
  if (!params) {
    return;
  }

  const { tradeInstructionsTags, ...rest } = params;

  return {
    ...(tradeInstructionsTags && {
      tradeInstructionsTags: {
        // @ts-check
        hasEvery: [...(tradeInstructionsTags as string[])],
      },
    }),
    ...rest,
  };
};
