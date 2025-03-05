import {
  CreateTradeParams,
  GetTradeInstructionsTagsPrismaType,
  GetTradeWhereType,
} from '../../../functions/trades/types';

export const createParamsRemapping = (params: CreateTradeParams) => ({
  state: 'ongoing',
  paid: false,
  ...params,
});

export const getParamsRemapping = (params?: GetTradeWhereType) => {
  if (!params) {
    return;
  }

  const { state, ...rest } = params;

  return {
    state: state as GetTradeInstructionsTagsPrismaType,
    ...rest,
  };
};
