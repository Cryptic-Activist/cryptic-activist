export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type UserInfo = {
  id: string;
  user: User;
  roomId?: string;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  user: User;
  timestamp: number;
};
