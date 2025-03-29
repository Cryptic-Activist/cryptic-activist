export const convertAssociationStringToObject = (associations: string) =>
  associations
    ?.toString()
    .split(',')
    .reduce((obj, key) => ({ ...obj, [key]: true }), {});
