export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type JoinParams = {
  user: User;
};

export type JoinRoomParams = {
  chatId: string;
  user: User;
  timitLimit: number;
  tradeType: 'buy' | 'sell';
  vendorWalletAddress: string;
};
