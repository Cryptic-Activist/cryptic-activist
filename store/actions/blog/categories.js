/* eslint-disable import/prefer-default-export */
export function getRecentCategories(number) {
  return {
    type: 'REQUEST_RECENT_CATEGORIES',
    payload: {
      number,
    },
  };
}
