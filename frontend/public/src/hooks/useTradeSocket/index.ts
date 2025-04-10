'use client';

import {
  Message,
  ReceiverStatus,
  SendMessageParams,
  SetAsPaidParams,
  UseSocketParams,
} from './types';
import io, { Socket } from 'socket.io-client';
import { useApp, useRouter } from '@/hooks';
import { useEffect, useState } from 'react';

import { BACKEND } from '@/constants';

const useTradeSocket = ({
  roomId,
  user,
  timeLimit,
  onSetPaid,
  onSetCanceled,
}: UseSocketParams) => {
  const { addToast } = useApp();
  const { replace } = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [receiverStatus, setReceiverStatus] =
    useState<ReceiverStatus>('online');

  const onStatusChange = (status: ReceiverStatus) => {
    setReceiverStatus(status);
  };

  const appendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (params: SendMessageParams) => {
    if (socket) {
      socket.emit('send_message', { roomId, ...params });
      appendMessage(params.content);
    }
  };

  const setAsPaid = (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_paid', { roomId, ...params });
    }
  };

  const setAsCanceled = (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_canceled', { roomId, ...params });
    }
  };

  useEffect(() => {
    if (roomId && user) {
      // Establish socket connection
      const newSocket = io(BACKEND, {
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        // Join room
        newSocket.emit('join_room', { roomId, user, timeLimit });
      });

      // Handle existing room messages
      newSocket.on('room_messages', (existingMessages: Message[]) => {
        setMessages(existingMessages);
      });

      // Listen for new messages
      newSocket.on('receive_message', (message: Message) => {
        console.log('receiving messages...');
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Handle room errors
      newSocket.on('room_error', (error: string) => {
        setRoomError(error);
      });

      newSocket.on('room_full', (data) => {
        console.log({ data });
      });

      newSocket.on('user_status', (data) => {
        onStatusChange(data.status);
      });

      newSocket.on('trade_set_paid_success', (data) => {
        onSetPaid(data.isPaid);
        addToast('success', 'Trade has been successfully executed', 8000);
        setTimeout(() => {
          replace('/', {
            scroll: true,
          });
        }, 2000);
      });

      newSocket.on('trade_set_canceled_success', () => {
        onSetCanceled();
        addToast('info', 'Trade has been successfully canceled', 8000);
        setTimeout(() => {
          replace('/', {
            scroll: true,
          });
        }, 2000);
      });

      newSocket.on('trade_set_paid_error', (data) => {
        if (data.error) {
          onSetPaid(false);
          addToast('error', 'Unable to set the trade as paid', 8000);
        }
      });

      newSocket.on('trade_set_canceled_error', (data) => {
        if (data.error) {
          addToast('error', 'Unable to cancel the trade', 8000);
        }
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        if (newSocket) {
          newSocket.emit('leave_room', roomId);
          newSocket.disconnect();
        }
      };
    }
  }, [roomId, user]);

  return {
    messages,
    roomError,
    receiverStatus,
    sendMessage,
    appendMessage,
    setAsPaid,
    setAsCanceled,
  };
};

export default useTradeSocket;
