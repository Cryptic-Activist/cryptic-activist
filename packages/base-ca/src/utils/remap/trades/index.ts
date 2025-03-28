export const createParamsRemapping = (params: any) => ({
  state: 'ongoing',
  paid: false,
  ...params,
});

export const getParamsRemapping = (params?: any) => {
  if (!params) {
    return;
  }

  const { status, ...rest } = params;

  return {
    status,
    ...rest,
  };
};
