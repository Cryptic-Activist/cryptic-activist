export const createParamsRemapping = (params?: any) => {
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

export const updateParamsRemapping = (params: any) => {
  const { tags, ...rest } = params;

  return {
    tags,
    ...rest,
  };
};
