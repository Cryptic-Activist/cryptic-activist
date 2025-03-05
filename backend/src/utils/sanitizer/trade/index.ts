import sanitizeHtml from 'sanitize-html';

import {
  ISanitizedInputCreateTrade,
  ISanitizedInputCreateTradeReturn,
  ISanitizedInputCreateGetReturn,
  ISanitizedInputGetTrade,
  ISanitizedInputCancelReturn,
  ISanitizedInputCancelTrade,
} from '@interfaces/controllers/trade';

export function sanitizeInputCreateTrade(tradeObj: ISanitizedInputCreateTrade):
ISanitizedInputCreateTradeReturn {
  const finalTradeObj: ISanitizedInputCreateTradeReturn = {};

  if (tradeObj.chat_id) {
    const cleanTradeChatId: string = sanitizeHtml(
      tradeObj.chat_id,
      {
        allowedTags: [],
      },
    ).trim();

    finalTradeObj.chat_id = BigInt(cleanTradeChatId);
  }

  if (tradeObj.cryptocurrency_id) {
    const cleanTradeCryptocurrencyId: string = sanitizeHtml(
      tradeObj.cryptocurrency_id,
      {
        allowedTags: [],
      },
    ).trim();

    finalTradeObj.cryptocurrency_id = BigInt(cleanTradeCryptocurrencyId);
  }

  if (tradeObj.fiat_id) {
    const cleanTradeFiatId: string = sanitizeHtml(
      tradeObj.fiat_id,
      {
        allowedTags: [],
      },
    ).trim();

    finalTradeObj.fiat_id = BigInt(cleanTradeFiatId);
  }

  if (tradeObj.offer_id) {
    const cleanTradeOfferId: string = sanitizeHtml(
      tradeObj.offer_id,
      {
        allowedTags: [],
      },
    ).trim();

    finalTradeObj.offer_id = BigInt(cleanTradeOfferId);
  }

  if (tradeObj.trader_id) {
    const cleanTradeTraderId: string = sanitizeHtml(
      tradeObj.trader_id,
      {
        allowedTags: [],
      },
    ).trim();

    finalTradeObj.trader_id = BigInt(cleanTradeTraderId);
  }

  if (tradeObj.vendor_id) {
    const cleanTradeVendorId: string = sanitizeHtml(
      tradeObj.vendor_id,
      {
        allowedTags: [],
      },
    ).trim();

    finalTradeObj.vendor_id = BigInt(cleanTradeVendorId);
  }

  if (tradeObj.cryptocurrency_amount) {
    if (typeof tradeObj.cryptocurrency_amount === 'number') {
      finalTradeObj.cryptocurrency_amount = tradeObj.cryptocurrency_amount;
    }
  }

  if (tradeObj.fiat_amount) {
    if (typeof tradeObj.fiat_amount === 'number') {
      finalTradeObj.fiat_amount = tradeObj.fiat_amount;
    }
  }

  return finalTradeObj;
}

export function sanitizeInputGetTrade(tradeObj: ISanitizedInputGetTrade):
ISanitizedInputCreateGetReturn {
  const finalTradeObj: ISanitizedInputCreateGetReturn = {};

  if (tradeObj.id) {
    const cleanTradeChatId: string = sanitizeHtml(
      tradeObj.id,
      {
        allowedTags: [],
      },
    ).trim();

    finalTradeObj.id = BigInt(cleanTradeChatId);
  }

  return finalTradeObj;
}

export function sanitizeInputCancelTrade(tradeObj: ISanitizedInputCancelTrade):
ISanitizedInputCancelReturn {
  const finalTradeObj: ISanitizedInputCreateGetReturn = {};

  if (tradeObj.id) {
    const cleanTradeChatId: string = sanitizeHtml(
      tradeObj.id,
      {
        allowedTags: [],
      },
    ).trim();

    finalTradeObj.id = BigInt(cleanTradeChatId);
  }

  return finalTradeObj;
}
