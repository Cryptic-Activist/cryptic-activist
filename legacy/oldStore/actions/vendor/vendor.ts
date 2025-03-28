export function getVendor(
  username: string,
): {
  type: 'REQUEST_GET_VENDOR';
  payload: {
    username: string;
  };
} {
  return {
    type: 'REQUEST_GET_VENDOR',
    payload: {
      username,
    },
  };
}
