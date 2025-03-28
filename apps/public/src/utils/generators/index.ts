import { v7 } from 'uuid';

export * from './object';

export const generateUUID = () => {
  return v7();
};
