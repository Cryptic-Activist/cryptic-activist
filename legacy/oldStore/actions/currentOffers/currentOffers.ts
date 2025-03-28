export function getCurrentOffers(
  user_id: string,
  payment_method_type: string,
): {
  type: 'REQUEST_GET_CURRENT_OFFERS';
  payload: {
    user_id: string;
    payment_method_type: string;
  };
} {
  return {
    type: 'REQUEST_GET_CURRENT_OFFERS',
    payload: {
      user_id,
      payment_method_type,
    },
  };
}
