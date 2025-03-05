export function getFeedbacksPagination(
  limit: number,
  skip: number,
  vendorId: BigInt,
  type: 'positive' | 'negative',
): {
  type: 'REQUEST_GET_FEEDBACK_PAGINATION';
  payload: {
    limit: number;
    skip: number;
    vendorId: BigInt;
    type: 'positive' | 'negative';
  };
} {
  return {
    type: 'REQUEST_GET_FEEDBACK_PAGINATION',
    payload: {
      limit,
      skip,
      vendorId,
      type,
    },
  };
}
