'use client';

import { Button, Chat } from '@/components';
import React, { useEffect } from 'react';
import {
  useBlockchain,
  useRouter,
  useTrade,
  useTradeSocket,
  useUser,
} from '@/hooks';

import styles from './page.module.scss';

const TradeVendor = () => {
  const {
    trade,
    setPaid,
    setCanceled,
    setPaymentConfirmed,
    setVendorWalletAddress,
    setTradeCreated,
  } = useTrade();
  const { user, query } = useUser();
  // const { addToast } = useApp();
  const { blockchain } = useBlockchain();
  const { replace } = useRouter();

  const {
    sendMessage,
    setAsCanceled,
    setAsPaymentConfirmed,
    messages,
    receiverStatus,
    escrowReleased,
  } = useTradeSocket({
    chatId: trade.chat?.id,
    user: trade.vendor,
    timeLimit: trade.offer?.timeLimit,
    tradePaid: trade.paid,
    trade: trade,
    walletAddress: blockchain.account?.address,
    onSetPaid: setPaid,
    onSetCanceled: setCanceled,
    onSetPaymentConfirmed: setPaymentConfirmed,
    onSetUpdateVendorWalletAddress: setVendorWalletAddress,
    onSetTradeCreated: setTradeCreated,
  });

  useEffect(() => {
    // if (query.isSuccess && !user.id) {
    //   back();
    //   return;
    // }
    // if (trade.vendor?.id && user.id && trade.vendor?.id !== user.id) {
    //   back();
    //   return;
    // }
    // if (!blockchain.account?.address) {
    //   addToast('error', 'You must have a wallet connected to trade', 10000);
    //   back();
    //   return;
    // }
    // if (
    //   trade.vendorWalletAddress &&
    //   blockchain.account?.address !== trade.vendorWalletAddress
    // ) {
    //   addToast(
    //     'error',
    //     'The current connected wallet must be the same one used to create the offer',
    //     10000
    //   );
    //   back();
    // }
  }, [trade.vendor?.id, user.id, query.isSuccess]);

  console.log({ trade });

  return (
    <div className={styles.container}>
      <div className={styles.trade}>
        <h1 className={styles.heading}>Negatiation has started</h1>
        <span className={styles.warning}>
          If anyone ask you to trade outside of the Cryptic Activist Catalog
          platform does not accept such request.
        </span>
        <p>{`${trade.trader?.firstName} ${trade.trader?.lastName}`}</p>
        {trade.paid && !trade.paymentConfirmed && (
          <Button
            type="button"
            onClick={() =>
              setAsPaymentConfirmed({
                from: trade.trader?.id,
                to: trade.vendor?.id,
              })
            }
          >
            <strong>Set as Payment Received</strong>
          </Button>
        )}
        {!escrowReleased && (
          <Button
            onClick={() =>
              setAsCanceled({
                from: trade.trader?.id,
                to: trade.vendor?.id,
              })
            }
          >
            Cancel
          </Button>
        )}
        {escrowReleased && (
          <Button onClick={() => replace('/vendors')}>Leave trade</Button>
        )}
      </div>
      <div>
        {trade.id && trade.vendor && trade.trader && (
          <Chat
            receiver={trade.trader}
            sender={trade.vendor}
            receiverStatus={receiverStatus}
            onSendMessage={sendMessage}
            messages={messages}
          />
        )}
      </div>
    </div>
  );
};

export default TradeVendor;
