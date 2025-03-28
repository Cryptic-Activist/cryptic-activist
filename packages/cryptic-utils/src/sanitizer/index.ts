import sanitizeHtml from 'sanitize-html';

export const sanitize = (unsanitized: object | string, exclude: string[]) => {
  let cleanObj: any;

  if (unsanitized === undefined) {
    return undefined;
  }

  if (unsanitized === null) {
    return null;
  }

  if (typeof unsanitized === 'string') {
    cleanObj = sanitizeHtml(unsanitized, { allowedTags: [] }).trim();
  }
  if (Array.isArray(unsanitized)) {
    cleanObj = unsanitized.map((item) =>
      sanitizeHtml(item, { allowedTags: [] }).trim(),
    );
  }
  if (
    typeof unsanitized === 'object' &&
    unsanitized !== null &&
    !Array.isArray(unsanitized)
  ) {
    cleanObj = {};
    Object.keys(unsanitized).forEach((prop, index) => {
      if (
        !exclude.includes(prop) &&
        Object.values(unsanitized)[index] !== undefined
      ) {
        const convertedToNumber = Number(unsanitized[prop]);

        if (Number.isNaN(convertedToNumber)) {
          if (typeof prop === 'string') {
            cleanObj[prop] = sanitizeHtml(unsanitized[prop], {
              allowedTags: [],
            }).trim();
          }
        } else {
          cleanObj[prop] = convertedToNumber;
        }
      }
    });
  }

  return cleanObj;
};

export const sanitizeQueryArray = (unsanitized: any) => {
  try {
    const stringied = String(unsanitized);
    if (stringied) {
      return sanitize(stringied.split(','), []);
    }
    return [];
  } catch (e) {
    return [];
  }
};
