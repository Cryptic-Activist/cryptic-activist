import {
  confirmFiatReceived,
  confirmFiatSent,
  depositByBuyer,
  depositBySeller,
  escalateDispute,
  getEscrowContractController,
  getEstimatedTradeCost,
  initTrade,
  raiseDispute,
  releaseTrade,
  resolveDispute,
} from '@/controllers/blockchains/ethereum';

import { Router } from 'express';
import { cancelTrade } from '@/controllers/trades';

const router = Router();

/**
 * Endpoint: Initialize a new trade
 *
 * Expected JSON body:
 * {
 *   "buyer": "0xBuyerAddress",
 *   "seller": "0xSellerAddress",
 *   "arbitrator": "0xArbitratorAddress",
 *   "cryptoAmount": "1000000000000000000",         // In wei (1 ether)
 *   "buyerCollateral": "100000000000000000",         // In wei (0.1 ether)
 *   "sellerCollateral": "100000000000000000",        // In wei (0.1 ether)
 *   "depositDuration": 3600,                        // Seconds
 *   "confirmationDuration": 3600,                   // Seconds
 *   "disputeTimeout": 7200,                         // Seconds
 *   "feeRate": 50,                                  // Basis points (50 = 0.5%)
 *   "platformWallet": "0xPlatformWalletAddress"
 * }
 */

router.get('/estimate-trade-cost', getEstimatedTradeCost);

router.get('/escrow', getEscrowContractController);

router.post('/init-trade', initTrade);

router.post('/deposit-by-buyer', depositByBuyer);

router.post('/deposit-by-seller', depositBySeller);

router.post('/confirm-fiat-sent', confirmFiatSent);

router.post('/confirm-fiat-received', confirmFiatReceived);

router.post('/release-trade', releaseTrade);

router.post('/cancel-trade', cancelTrade);

router.post('/raise-dispute', raiseDispute);

router.post('/escalate-dispute', escalateDispute);

router.post('/resolve-dispute', resolveDispute);

export default router;
