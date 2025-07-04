'use client';

import {
  Message,
  ReceiverStatus,
  SendMessageParams,
  SetAsDisputedParams,
  SetAsPaidParams,
  UseSocketParams,
} from './types';
import { useEffect, useRef, useState } from 'react';

import { Socket } from 'socket.io-client';
import { getSocket } from '@/services/socket';
import { hasEnoughBalance } from '@/utils/math';
import { scrollElement } from '@/utils';
import { useApp } from '@/hooks';

const useTradeSocket = ({
  chatId,
  user,
  timeLimit,
  trade,
  walletAddress,
  blockchain,
  onSetPaid,
  onSetCanceled,
  onSetPaymentConfirmed,
  onSetTradeCreated,
  onSetDisputed,
}: UseSocketParams) => {
  const { addToast, app } = useApp();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [receiverStatus, setReceiverStatus] =
    useState<ReceiverStatus>('online');
  const [escrowReleased, setEscrowRelease] = useState(false);
  const [tradeRemaingTime, setTradeRemainingTime] = useState<number | null>(
    null
  );
  const tradeContainerRef = useRef<HTMLDivElement | null>(null);

  const [vendorHasEnoughFunds, setVendorHasEnoughFunds] = useState(true);
  const [traderHasEnoughFunds, setTraderHasEnoughFunds] = useState(true);

  const onStatusChange = (status: ReceiverStatus) => {
    setReceiverStatus(status);
  };

  const appendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (params: SendMessageParams) => {
    if (socket) {
      socket.emit('send_message', { ...params, chatId });
      appendMessage(params.content);
    }
  };

  const setAsPaid = (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_paid', { ...params, chatId });
    }
  };

  const setAsCanceled = (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_canceled', { ...params, chatId });
    }
  };

  const setAsPaymentConfirmed = (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_payment_confirmed', { ...params, chatId });
    }
  };

  const setAsDisputed = (params: SetAsDisputedParams) => {
    if (socket) {
      socket.emit('trade_set_disputed', { ...params, chatId });
    }
  };

  useEffect(() => {
    if (chatId && user) {
      const socket = getSocket();

      if (!socket.connected) {
        socket.connect();
      }

      const vendorWalletAddress =
        user.id === trade.vendor?.id ? walletAddress : undefined;

      if (
        trade?.cryptocurrencyAmount &&
        blockchain?.balance?.value &&
        blockchain?.balance?.decimals &&
        app.settings?.depositPerTradePercent &&
        trade?.offer?.offerType
      ) {
        // Vendor
        if (user.id === trade.vendor?.id) {
          let hasEnoughVendor = false;
          if (trade.offer?.offerType === 'buy') {
            hasEnoughVendor = hasEnoughBalance(
              trade.cryptocurrencyAmount,
              blockchain?.balance?.value,
              blockchain?.balance?.decimals,
              app.settings?.depositPerTradePercent,
              'sell'
            );
          } else if (trade.offer?.offerType === 'sell') {
            hasEnoughVendor = hasEnoughBalance(
              trade.cryptocurrencyAmount,
              blockchain?.balance?.value,
              blockchain?.balance?.decimals,
              app.settings?.depositPerTradePercent,
              'buy'
            );
          }

          console.log({ hasEnoughVendor });

          if (!hasEnoughVendor) {
            setVendorHasEnoughFunds(false);
            return;
          }
        }
        // Trader
        if (user.id === trade.trader?.id) {
          console.log('Trader...');
          let hasEnoughTrader = false;
          if (trade.offer?.offerType === 'buy') {
            hasEnoughTrader = hasEnoughBalance(
              trade.cryptocurrencyAmount,
              blockchain?.balance?.value,
              blockchain?.balance?.decimals,
              app.settings?.depositPerTradePercent,
              'buy'
            );
          } else if (trade.offer?.offerType === 'sell') {
            hasEnoughTrader = hasEnoughBalance(
              trade.cryptocurrencyAmount,
              blockchain?.balance?.value,
              blockchain?.balance?.decimals,
              app.settings?.depositPerTradePercent,
              'sell'
            );
          }

          if (!hasEnoughTrader) {
            setTraderHasEnoughFunds(false);
            return;
          }
        }
      }

      console.log('continuing');

      // Join room
      socket.emit('join_room', {
        chatId,
        user,
        timeLimit,
        vendorWalletAddress,
        tradeId: trade.id,
        userId: user.id,
        trade,
      });

      // Handle existing room messages
      socket.on('trade_error', (payload) => {
        // back();
        addToast('error', payload.error, 10000);
      });

      // Handle existing room messages
      socket.on('room_messages', (existingMessages: Message[]) => {
        setMessages(existingMessages);
      });

      // Listen for new messages
      socket.on('receive_message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Handle room errors
      socket.on('room_error', (error: string) => {
        setRoomError(error);
      });

      socket.on('room_full', (_data) => {});

      socket.on('user_status', (data) => {
        onStatusChange(data.status);
      });

      socket.on('trade_set_paid_success', (data) => {
        onSetPaid(data.paidAt);
        addToast('info', 'Trade has been set as Paid', 8000);
        scrollElement(tradeContainerRef, 1000, 0);
      });

      socket.on('trade_funded_success', (data) => {
        if (data.fundedAt) {
          // @ts-ignore
          trade.setTradeValue(
            {
              status: 'IN_PROGRESS',
              fundedAt: data.fundedAt,
            },
            'trade/setFundedAt'
          );
          scrollElement(tradeContainerRef, 1000, 1000);
        }
      });

      socket.on('trade_set_payment_confirmed_success', (data) => {
        onSetPaymentConfirmed(data);
        addToast('info', 'Payment has been set as Received', 8000);
      });

      socket.on('escrow_released', () => {
        setEscrowRelease(true);
        addToast(
          'success',
          'Trade has been successfully executed. Escrow was released.',
          8000
        );
        scrollElement(tradeContainerRef, -1000, 0);
      });

      socket.on('trade_set_canceled_success', ({ status, endedAt }) => {
        onSetCanceled({ status, endedAt });
        addToast('info', 'Trade has been successfully canceled', 8000);
      });

      socket.on('trade_set_disputed_success', ({ status, disputedAt }) => {
        onSetDisputed({
          status,
          disputedAt,
        });
      });

      socket.on('trade_set_paid_error', (data) => {
        if (data.error) {
          // onSetPaid(false);
          addToast('error', 'Unable to set the trade as paid', 8000);
        }
      });

      socket.on('trade_set_canceled_error', (data) => {
        if (data.error) {
          addToast('error', 'Unable to cancel the trade', 8000);
        }
      });

      socket.on('trade_set_payment_confirmed_error', (data) => {
        if (data.error) {
          addToast('error', 'Unable to set the payment as received', 8000);
        }
      });

      socket.on('trade_set_disputed_error', (data) => {
        if (data.error) {
          addToast('error', 'Unable to set a dispute', 8000);
        }
      });

      socket.on('chat_info_message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('blockchain_trade_created', (_payload) => {
        onSetTradeCreated();
        // setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('timer:update', (data) => {
        const { remaining } = data;
        setTradeRemainingTime(remaining);
      });

      socket.on('timer:expired', (data) => {
        // @ts-ignore
        trade.setTradeValue(
          {
            status: 'EXPIRED',
            expiredAt: data.expiredAt,
          },
          'trade/setExpiredAt'
        );
      });

      socket.on('trade_set_disputed_success', (data) => {
        // @ts-ignore
        trade.setTradeValue(
          {
            status: data.status,
            disputedAt: data.disputedAt,
          },
          'trade/setEndedAt'
        );
      });

      socket.on('trade_failed', (data) => {
        // @ts-ignore
        trade.setTradeValue(
          {
            status: 'FAILED',
            endedAt: data.endedAt,
          },
          'trade/setEndedAt'
        );
      });

      setSocket(socket);

      // Cleanup on unmount
      return () => {
        if (socket) {
          socket.emit('leave_room', chatId);
          socket.disconnect();
        }
      };
    }
  }, [chatId, user, blockchain, app]);

  useEffect(() => {
    if (trade.escrowReleasedAt) {
      setEscrowRelease(true);
    }
  }, [trade.escrowReleasedAt]);

  return {
    messages,
    roomError,
    receiverStatus,
    escrowReleased,
    tradeRemaingTime,
    tradeContainerRef,
    vendorHasEnoughFunds,
    traderHasEnoughFunds,
    sendMessage,
    appendMessage,
    setAsPaid,
    setAsCanceled,
    setAsPaymentConfirmed,
    setAsDisputed,
  };
};

export default useTradeSocket;
