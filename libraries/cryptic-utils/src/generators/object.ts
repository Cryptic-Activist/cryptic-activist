export const convertWhere = (object: object, exclude: string[]) => {
  const whereObj = {};
  Object.keys(object).forEach((prop, index) => {
    if (!exclude.includes(prop) && Object.values(object)[index] !== undefined) {
      whereObj[prop] = object[prop];
    }
  });

  return whereObj;
};

export const objectToQuery = (object: object) => {
  console.log(Object.keys(object));
};
