'use client';

import {
  Message,
  ReceiverStatus,
  SendMessageParams,
  SetAsPaidParams,
  UseSocketParams,
} from './types';
import io, { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

import { BACKEND } from '@/constants';

const useSocket = ({ roomId, user, timeLimit }: UseSocketParams) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomUsers, setRoomUsers] = useState<string[]>([]);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [receiverStatus, setReceiverStatus] =
    useState<ReceiverStatus>('online');
  const [isTradePaid, setIsTradePaid] = useState(null);

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
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Listen for room user updates
      newSocket.on('room_users_update', (users: string[]) => {
        setRoomUsers(users);
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
        setIsTradePaid(data.isPaid);
      });

      newSocket.on('trade_set_paid_error', (data) => {
        setIsTradePaid(data.error);
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
    roomUsers,
    roomError,
    receiverStatus,
    sendMessage,
    appendMessage,
    setAsPaid,
    isTradePaid,
  };
};

export default useSocket;
