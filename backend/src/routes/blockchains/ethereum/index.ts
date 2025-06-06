import {
  cancelTradeController,
  escalateDisputeController,
  getEscrowContractController,
  getEstimatedTradeCostController,
  raiseDisputeController,
  resolveDisputeController,
} from '@/controllers/blockchains/ethereum';

import { Router } from 'express';

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

router.get('/estimate-trade-cost', getEstimatedTradeCostController);

router.get('/escrow', getEscrowContractController);

router.post('/cancel-trade', cancelTradeController);

router.post('/raise-dispute', raiseDisputeController);

router.post('/escalate-dispute', escalateDisputeController);

router.post('/resolve-dispute', resolveDisputeController);

export default router;
