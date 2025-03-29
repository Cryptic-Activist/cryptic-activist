export const isHexColor = (value: any): void => {
  if (typeof value !== 'string') {
    throw new Error('Only string value is allowed!');
  }

  const regex = /^#(?:[0-9a-f]{3}){1,2}$/i;
  if (value.match(regex) === null) {
    throw new Error('Only hexadecimal color value is allowed!');
  }
};
