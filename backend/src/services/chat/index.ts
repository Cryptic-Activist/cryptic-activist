import { IChatMessage } from '@/models/ChatMessage/types';
import { getPresignedUrl } from '../upload';

export const retrieveChatMessageWithAttachments = async (
  chatMessages: IChatMessage[],
) => {
  const mappedChatMesasge = chatMessages.map(async (chatMessage) => {
    let msg = {
      chatId: chatMessage.chatId,
      from: chatMessage.from,
      to: chatMessage.to,
      type: chatMessage.type,
      message: chatMessage.message,
      createdAt: chatMessage.createdAt,
    };
    if (!chatMessage.attachment?.key) {
      return msg;
    }
    const { key, ...restAttachment } = chatMessage.attachment;
    const presigned = await getPresignedUrl(key);

    return {
      ...msg,
      attachment: {
        ...restAttachment,
        key: presigned.url,
      },
    };
  });

  const promisedChatMessages = await Promise.all(mappedChatMesasge);
  return promisedChatMessages;
};
