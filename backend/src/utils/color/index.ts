export const getRandomHighContrastColor = () => {
  let r: number, g: number, b: number, brightness: number;

  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    brightness = (r * 299 + g * 587 + b * 114) / 1000;
  } while (brightness > 180);

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
