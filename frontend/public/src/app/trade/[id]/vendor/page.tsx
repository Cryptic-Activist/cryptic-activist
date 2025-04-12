'use client';

import React, { useEffect } from 'react';
import { useBlockchain, useTrade, useTradeSocket, useUser } from '@/hooks';

import { Chat } from '@/components';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

const TradeVendor = () => {
  const { trade, setPaid, setCanceled, setVendorWalletAddress } = useTrade();
  const { user, query } = useUser();
  const { blockchain } = useBlockchain();
  const router = useRouter();

  const { sendMessage, messages, receiverStatus } = useTradeSocket({
    roomId: trade.chat?.id,
    user: trade.vendor,
    timeLimit: trade.offer?.timeLimit,
    tradePaid: trade.paid,
    trade: trade,
    walletAddress: blockchain.account?.address,
    onSetPaid: setPaid,
    onSetCanceled: setCanceled,
    onSetUpdateVendorWalletAddress: setVendorWalletAddress,
  });

  useEffect(() => {
    if (query.isSuccess && !user.id) {
      router.back();
      return;
    }
    if (trade.vendor?.id && user.id && trade.vendor?.id !== user.id) {
      router.back();
    }
    if (!blockchain.account?.address) {
      router.back();
    }
    if (
      trade.vendorWalletAddress &&
      blockchain.account?.address !== trade.vendorWalletAddress
    ) {
      router.back();
    }
    if (trade.id && blockchain.account?.address) {
    }
  }, [trade.vendor?.id, user.id, query.isSuccess]);

  return (
    <div className={styles.container}>
      <div className={styles.trade}>
        <h1 className={styles.heading}>Negatiation has started</h1>
        <span className={styles.warning}>
          If anyone ask you to trade outside of the Cryptic Activist Catalog
          platform does not accept such request.
        </span>
        <p>{`${trade.trader?.firstName} ${trade.trader?.lastName}`}</p>
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
