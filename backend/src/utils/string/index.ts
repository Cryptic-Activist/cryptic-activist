export const generateRandomHash = (length = 4) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';
  for (let i = 0; i < length; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
};

export const isNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && value.trim() !== '';
};

export const toUpperCase = (text?: string) => {
  return text ? text?.toUpperCase() : '';
};
