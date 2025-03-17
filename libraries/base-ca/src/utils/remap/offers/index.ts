import {
  CreateOfferParams,
  UpdateOfferToUpdateType,
  UpdateTagsPrismaType,
} from '../../../functions/offers/types';

export const createParamsRemapping = (params?: CreateOfferParams) => {
  if (!params) {
    return;
  }

  const { tags, ...rest } = params;

  return {
    ...(tags && {
      tags: {
        // @ts-check
        hasEvery: [...(tags as string[])],
      },
    }),
    ...rest,
  };
};

export const updateParamsRemapping = (
  params: UpdateOfferToUpdateType
) => {
  const { tags, ...rest } = params;

  return {
    tags: tags as UpdateTagsPrismaType,
    ...rest,
  };
};
