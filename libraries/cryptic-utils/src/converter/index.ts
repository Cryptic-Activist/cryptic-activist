import { ConverterToType } from './types';

export const converterToType = ({
  convertTo,
  valuesToConvert,
}: ConverterToType) => {
  const converted: { [key: string]: any } = {};

  Object.entries(valuesToConvert).forEach((valuePair, index) => {
    const key = Object.values(convertTo)[index];

    if (key === 'string') {
      converted[valuePair[0]] = valuePair[1].toString();
    }
    if (key === 'number') {
      converted[valuePair[0]] = Number(valuePair[1]);
    }
  });

  return converted;
};
