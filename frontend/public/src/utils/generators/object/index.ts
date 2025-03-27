export const objectToQuery = (object: object) => {
  const str = [];
  for (const p in object)
    if (object.hasOwnProperty(p)) {
      // @ts-ignore
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(object[p]));
    }
  return str.join('&');
};
