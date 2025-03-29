export const filterLongShort = (array: any[]) =>
  array.filter(
    ({ id }) => id.includes('long') === false && id.includes('short') === false,
  );
