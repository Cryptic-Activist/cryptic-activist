export const validate = (
  bodyRequest: object,
  expectedRequest: object,
): string[] => {
  const errors: string[] = [];
  Object.keys(bodyRequest).forEach((key, index) => {
    if (key !== Object.keys(expectedRequest)[index]) {
      errors.push(
        `Expected the object key: ${
          Object.keys(expectedRequest)[index]
        }, but it received: ${key}; Property number ${index}`,
      );
    }
    if (typeof bodyRequest[key] !== typeof expectedRequest[key]) {
      errors.push(
        `Expected the type of ${typeof expectedRequest[
          key
        ]}, but it received ${typeof bodyRequest[
          key
        ]}; Property number ${index}`,
      );
    }

    if (typeof bodyRequest[key] === 'string') {
      if (bodyRequest[key].length === 0) {
        errors.push(
          `The property ${key} must be at least one character long; Property number ${index}`,
        );
      }
    }

    if (typeof bodyRequest[key] === 'number') {
      try {
        Number(bodyRequest[key]);
      } catch (err) {
        errors.push(
          `The property ${key} is not a number; Property number ${index}`,
        );
      }
    }
  });

  return errors;
};

export function compareSame(toCompare, compared): boolean {
  return toCompare === compared;
}

export * from './authorization/user';
