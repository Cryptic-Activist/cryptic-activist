import { UserWhereInput } from '@/functions/users/types';

export const getParamsRemapping = (params?: UserWhereInput) => {
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

export const getUsersParamsRemapping = (params?: UserWhereInput) => {
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
