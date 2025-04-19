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
  chatId,
  user,
  timeLimit,
  trade,
  walletAddress,
  onSetPaid,
  onSetCanceled,
  onSetPaymentConfirmed,
}: UseSocketParams) => {
  const { addToast } = useApp();
  const { replace } = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [receiverStatus, setReceiverStatus] =
    useState<ReceiverStatus>('online');
  const [escrowReleased, setEscrowRelease] = useState(false);

  const onStatusChange = (status: ReceiverStatus) => {
    setReceiverStatus(status);
  };

  const appendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (params: SendMessageParams) => {
    if (socket) {
      socket.emit('send_message', { chatId, ...params });
      appendMessage(params.content);
    }
  };

  const setAsPaid = (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_paid', { chatId, ...params });
    }
  };

  const setAsCanceled = (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_canceled', { chatId, ...params });
    }
  };

  const setAsPaymentConfirmed = (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_payment_confirmed', { chatId, ...params });
    }
  };

  useEffect(() => {
    if (chatId && user) {
      // Establish socket connection
      const newSocket = io(BACKEND, {
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        const vendorWalletAddress =
          user.id === trade.vendor?.id ? walletAddress : undefined;
        console.log({
          userId: user.id,
          tradeVendorid: trade.vendor?.id,
          vendorWalletAddress,
        });
        // Join room
        newSocket.emit('join_room', {
          chatId,
          user,
          timeLimit,
          vendorWalletAddress,
          tradeId: trade.id,
          userId: user.id,
          trade,
        });
      });

      // Handle existing room messages
      newSocket.on('trade_error', (payload) => {
        // back();
        console.log({ payload });
        addToast('error', payload.error, 10000);
      });

      // Handle existing room messages
      newSocket.on('room_messages', (existingMessages: Message[]) => {
        console.log({ existingMessages });
        setMessages(existingMessages);
      });

      // Listen for new messages
      newSocket.on('receive_message', (message: Message) => {
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
        addToast('info', 'Trade has been set as Paid', 8000);
      });

      newSocket.on('trade_set_payment_confirmed_success', (data) => {
        onSetPaymentConfirmed(data.hasReceived);
        addToast('info', 'Payment has been set as Received', 8000);
      });

      newSocket.on('escrow_released', () => {
        setEscrowRelease(true);
        addToast(
          'success',
          'Trade has been successfully executed. Escrow was released.',
          8000
        );
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

      newSocket.on('trade_set_payment_confirmed_error', (data) => {
        if (data.error) {
          onSetPaymentConfirmed(false);
          addToast('error', 'Unable to set the payment as received', 8000);
        }
      });

      newSocket.on('chat_info_message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on('blockchain_trade_created', (_payload) => {
        // setMessages((prevMessages) => [...prevMessages, message]);
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        if (newSocket) {
          newSocket.emit('leave_room', chatId);
          newSocket.disconnect();
        }
      };
    }
  }, [chatId, user]);

  useEffect(() => {
    if (trade.escrowReleaseDate) {
      setEscrowRelease(true);
    }
  }, [trade.escrowReleaseDate]);

  return {
    messages,
    roomError,
    receiverStatus,
    escrowReleased,
    sendMessage,
    appendMessage,
    setAsPaid,
    setAsCanceled,
    setAsPaymentConfirmed,
  };
};

export default useTradeSocket;
