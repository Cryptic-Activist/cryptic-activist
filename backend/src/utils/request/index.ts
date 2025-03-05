export const convertWhere = (obj = {}, exclude: string[]) => {
  const whereObj = {};
  Object.keys(obj).forEach((prop, index) => {
    if (!exclude.includes(prop) && Object.values(obj)[index] !== undefined) {
      whereObj[prop] = obj[prop];
    }
  });

  return whereObj;
};
