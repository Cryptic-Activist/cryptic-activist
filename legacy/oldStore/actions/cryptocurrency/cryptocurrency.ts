export function chooseCryptocurrecy(
  cryptoId: string,
): {
  type: 'CHOOSE_CRYPTOCURRENCY';
  payload: {
    cryptoId: string;
  };
} {
  return {
    type: 'CHOOSE_CRYPTOCURRENCY',
    payload: {
      cryptoId,
    },
  };
}
