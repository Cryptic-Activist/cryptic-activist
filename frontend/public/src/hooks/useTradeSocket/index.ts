'use client';

import {
  Message,
  ReceiverStatus,
  SendMessageParams,
  SetAsDisputedParams,
  SetAsPaidParams,
  UseSocketParams,
} from './types';
import {
  approveToken as approveTokenERC20,
  buyerFundTrade as buyerFundTradeERC20,
  getTokenAllowance as getTokenAllowanceERC20,
  getTokenBalance as getTokenBalanceERC20,
  getTokenDecimals as getTokenDecimalsERC20,
  sellerFundTrade as sellerFundTradeERC20,
} from '@/services/ethers/escrow/erc20';
import {
  buyerFundTrade as buyerFundTradeNative,
  sellerFundTrade as sellerFundTradeNative,
} from '@/services/ethers/escrow/native';
import { parseEther, parseUnits } from 'ethers';
import { toTokenUnits, toTokenUnitsConvert } from '@/utils/blockchain';
import { useApp, useContracts } from '@/hooks';
import { useEffect, useRef, useState } from 'react';

import { Socket } from 'socket.io-client';
import { TX_CODE } from '@/services/ethers/escrow/types';
import { getSocket } from '@/services/socket';
import { scrollElement } from '@/utils';

const useTradeSocket = ({
  chatId,
  user,
  timeLimit,
  trade,
  walletAddress,
  onSetPaid,
  onSetCanceled,
  onSetPaymentConfirmed,
  onSetDisputed,
  refetchTrade,
}: UseSocketParams) => {
  const { addToast } = useApp();
  const {
    contracts: { escrow },
  } = useContracts(false);

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

  const [vendorHasEnoughFunds, _setVendorHasEnoughFunds] = useState(true);
  const [traderHasEnoughFunds, _setTraderHasEnoughFunds] = useState(true);
  const [isERC20Trade, setIsERC20Trade] = useState(true);

  // console.log({ isERC20Trade, tradeToken: trade.token });

  const onStatusChange = (status: ReceiverStatus) => {
    setReceiverStatus(status);
  };

  const appendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (params: SendMessageParams) => {
    if (socket) {
      console.log({ params });
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

  const setAsPaymentConfirmed = async (params: SetAsPaidParams) => {
    if (socket) {
      socket.emit('trade_set_payment_confirmed', { ...params, chatId });
    }
  };

  const setAsDisputed = (params: SetAsDisputedParams) => {
    if (socket) {
      socket.emit('trade_set_disputed', { ...params, chatId });
    }
  };

  const fundTradeAsSeller = async () => {
    if (
      socket &&
      trade?.tradeEscrowDetails &&
      escrow &&
      trade.cryptocurrencyAmount &&
      trade.traderWalletAddress &&
      trade.vendorWalletAddress &&
      trade.offer &&
      trade.offer.offerType
    ) {
      if (isERC20Trade) {
        const decimals = await getTokenDecimalsERC20({
          tokenContractDetails: trade.token,
        });

        if (!decimals) {
          addToast('error', 'Unable to fetch token decimals', 8000);
          return;
        }

        const baseUnits = toTokenUnits(
          trade.tradeEscrowDetails?.sellerTotalFund,
          decimals,
          1.1
        );

        const approved = await approveTokenERC20({
          amount: baseUnits,
          escrowContractDetails: escrow.erc20,
          tokenContractDetails: trade.token,
        });

        console.log({ approved });

        if (approved.error) {
          addToast('error', 'Unable to approve token', 8000);
          return;
        }

        const allowance = await getTokenAllowanceERC20({
          escrowContractDetails: escrow.erc20,
          tokenContractDetails: trade.token,
        });

        console.log({ allowance });

        // if (allowance.lt(baseUnits)) {
        //   addToast('error', 'Insufficient token allowance', 8000);
        //   return;
        // }

        const balance = await getTokenBalanceERC20({
          tokenContractDetails: trade.token,
        });

        console.log({ balance });

        // // if (allowance.lt(balance.balance)) {
        // //   addToast('error', 'Insufficient token allowance', 8000);
        // //   return;
        // // }

        const tx = await sellerFundTradeERC20(
          parseInt(trade?.tradeEscrowDetails?.blockchainTradeId, 10),
          escrow.erc20
        );

        if (tx.error) {
          if (tx.error.code === TX_CODE.ACTION_REJECTED) {
            socket.emit('blockchaion_seller_fund_trade_rejected', {
              chatId,
              senderId: user?.id,
            });
            return;
          }
          if (tx.error.code === TX_CODE.NO_CONTRACT_FOUND) {
            addToast('error', 'Unable to fund trade', 8000);
            return;
          }
        }
      } else {
        const tx = await sellerFundTradeNative(
          parseInt(trade?.tradeEscrowDetails?.blockchainTradeId, 10),
          parseEther(trade.tradeEscrowDetails?.sellerTotalFund.toString()),
          escrow.native
        );

        if (tx.error) {
          if (tx.error.code === TX_CODE.ACTION_REJECTED) {
            socket.emit('blockchaion_seller_fund_trade_rejected', {
              chatId,
              senderId: user?.id,
            });
            return;
          }
          if (tx.error.code === TX_CODE.NO_CONTRACT_FOUND) {
            addToast('error', 'Unable to fund trade', 8000);
            return;
          }
        }
      }

      addToast('info', 'Trade was funded by the seller', 8000);
      socket.emit('blockchain_seller_funded_trade', {
        chatId: trade.chat?.id,
        senderId: user?.id,
      });
    }
  };

  const fundTradeAsBuyer = async () => {
    if (
      socket &&
      trade?.tradeEscrowDetails &&
      escrow &&
      trade.cryptocurrencyAmount &&
      trade.traderWalletAddress &&
      trade.vendorWalletAddress &&
      trade.offer &&
      trade.offer.offerType
    ) {
      if (isERC20Trade) {
        const decimals = await getTokenDecimalsERC20({
          tokenContractDetails: trade.token,
        });

        if (!decimals) {
          addToast('error', 'Unable to fetch token decimals', 8000);
          return;
        }

        const baseUnits = toTokenUnits(
          trade.tradeEscrowDetails?.buyerCollateral,
          decimals,
          1.1
        );

        const approved = await approveTokenERC20({
          amount: baseUnits,
          escrowContractDetails: escrow.erc20,
          tokenContractDetails: trade.token,
        });

        if (approved.error) {
          addToast('error', 'Unable to approve token', 8000);
          return;
        }
        const allowance = await getTokenAllowanceERC20({
          escrowContractDetails: escrow.erc20,
          tokenContractDetails: trade.token,
        });

        console.log({ allowance });

        const balance = await getTokenBalanceERC20({
          tokenContractDetails: trade.token,
        });

        const tx = await buyerFundTradeERC20(
          parseInt(trade?.tradeEscrowDetails?.blockchainTradeId, 10),
          escrow.erc20
        );

        console.log({ tx });

        if (tx.error) {
          if (tx.error.code === TX_CODE.ACTION_REJECTED) {
            socket.emit('blockchaion_seller_fund_trade_rejected', {
              chatId,
              senderId: user?.id,
            });
            return;
          }
          if (tx.error.code === TX_CODE.NO_CONTRACT_FOUND) {
            addToast('error', 'Unable to fund trade', 8000);
            return;
          }
        }
      } else {
        const tx = await buyerFundTradeNative(
          parseInt(trade?.tradeEscrowDetails?.blockchainTradeId, 10),
          parseEther(trade.tradeEscrowDetails?.buyerCollateral.toString()),
          escrow.native
        );

        console.log({ tx });

        if (tx.error) {
          if (tx.error.code === TX_CODE.ACTION_REJECTED) {
            socket.emit('blockchaion_seller_fund_trade_rejected', {
              chatId,
              senderId: user?.id,
            });
            return;
          }
          if (tx.error.code === TX_CODE.NO_CONTRACT_FOUND) {
            addToast('error', 'Unable to fund trade', 8000);
            return;
          }
        }
      }

      addToast('info', 'Trade was funded by the buyer', 8000);
      socket.emit('blockchain_buyer_funded_trade', {
        chatId: trade.chat?.id,
        senderId: user?.id,
      });
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
        refetchTrade();
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
        refetchTrade();
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

      socket.on('blockchaion_seller_fund_trade_rejected_success', () => {
        refetchTrade();
      });

      socket.on('blockchaion_buyer_fund_trade_rejected_success', () => {
        refetchTrade();
      });

      socket.on('blockchain_trade_created', async () => {
        refetchTrade();
      });

      socket.on('blockchain_buyer_funded_trade_success', (_data) => {
        refetchTrade();
      });

      socket.on('blockchain_seller_funded_trade_success', (_data) => {
        refetchTrade();
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
  }, [chatId, user]);

  useEffect(() => {
    if (trade.escrowReleasedAt) {
      setEscrowRelease(true);
    }
  }, [trade.escrowReleasedAt]);

  useEffect(() => {
    if (trade.token?.address === null || trade.token?.abi?.length === 0) {
      setIsERC20Trade(false);
      return;
    }
  }, [trade.token]);

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
    fundTradeAsBuyer,
    fundTradeAsSeller,
  };
};

export default useTradeSocket;
