import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const getChatHistory = async (chatId: string) => {
  const response = await fetchGet(BACKEND + '/chats/history/' + chatId);

  if (response.status !== 200) return null;

  return response.data;
};
