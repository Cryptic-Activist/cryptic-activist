'use client';

import { Message, UseSocketParams } from './types';
import io, { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

import { BACKEND } from '@/constants';

const useSocket = ({ roomId, user }: UseSocketParams) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomUsers, setRoomUsers] = useState<string[]>([]);
  const [roomError, setRoomError] = useState<string | null>(null);

  useEffect(() => {
    if (roomId && user) {
      // Establish socket connection
      const newSocket = io(BACKEND, {
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        // Join room
        newSocket.emit('join_room', { roomId, user });
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

  const sendMessage = (content: string) => {
    if (socket && content.trim()) {
      console.log({ content });
      socket.emit('send_message', { roomId, content });
    }
  };

  return {
    messages,
    roomUsers,
    roomError,
    sendMessage,
  };
};

export default useSocket;
