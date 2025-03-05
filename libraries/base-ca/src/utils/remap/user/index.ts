import { WhereUserParams } from '@/functions/users/types';

export const getParamsRemapping = (params?: WhereUserParams) => {
  if (!params) {
    return;
  }

  const { privateKeys, ...rest } = params;

  return {
    ...(privateKeys && {
      privateKeys: {
        // @ts-ignore
        hasEvery: [...(privateKeys as string[])],
      },
    }),
    ...rest,
  };
};

export const getUsersParamsRemapping = (params?: WhereUserParams) => {
  let whereObj;

  if (params) {
    const { privateKeys, ...rest } = params;
    whereObj = {
      ...rest,
      privateKeys: {
        hasEvery: [...(privateKeys as string[])],
      },
    };
  }

  return whereObj;
};
