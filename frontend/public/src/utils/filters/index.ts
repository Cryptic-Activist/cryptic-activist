export const searchArrayOfObjects = (
  array: { [key: string]: any }[],
  key: string,
  value: string
) => {
  const filtered = array.filter((arrayItem) =>
    arrayItem[key].toLowerCase().includes(value.toLowerCase())
  );
  return filtered;
};
