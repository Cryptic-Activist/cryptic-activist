export function getOffer(
  offerId: string,
): {
  type: 'REQUEST_GET_OFFER';
  payload: {
    offerId: string;
  };
} {
  return {
    type: 'REQUEST_GET_OFFER',
    payload: {
      offerId,
    },
  };
}
