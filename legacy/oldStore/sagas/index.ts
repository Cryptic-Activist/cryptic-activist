import { all, takeLatest } from "redux-saga/effects";

import LoginUser from "./user/loginUser";
import decodeAccessToken from "./user/decodeAccessToken";
import LogoutUser from "./user/logoutUser";

import GetCryptocurrencies from "./cryptocurrencies/getCryptocurrencies";

import GetFiats from "./fiats/getFiats";

import GetOffer from "./offer/getOffer";

import GetCurrentOffers from "./currentOffers/getCurrentOffers";
import GetOffersPagination from "./offers/getOffersPagination";

import GetFeedbacksPagination from "./feedbacks/getFeedbacksPagination";

import SetWallet from "./wallet/setWallet";
import SendTransaction from "./wallet/sendTransaction";

import GetVendor from "./vendor/getVendor";

import GetDefaultFiat from "./app/getDefaultFiat";
import GetDefaultCryptocurrency from "./app/getDefaultCryptocurrency";
import GetDefaultPaymentMethod from "./app/getDefaultPaymentMethod";

import GetCurrentCryptocurrencyPrice from "./create/getCurrentCryptocurrencyPrice";
import SubmitOffer from "./create/submitOfferCreation";

import GetSystemMessages from "./systemMessages/getSystemMessages";

export default function* root() {
	yield all([
		takeLatest("REQUEST_LOGIN_USER", LoginUser),
		takeLatest("REQUEST_DECODE_TOKEN", decodeAccessToken),
		takeLatest("REQUEST_LOGOUT_USER", LogoutUser),
		takeLatest("REQUEST_GET_CRYPTOCURRENCIES", GetCryptocurrencies),
		takeLatest("REQUEST_GET_FIATS", GetFiats),
		takeLatest("REQUEST_GET_OFFER", GetOffer),
		takeLatest("REQUEST_GET_CURRENT_OFFERS", GetCurrentOffers),
		takeLatest("REQUEST_GET_OFFERS_PAGINATION", GetOffersPagination),
		takeLatest("REQUEST_GET_FEEDBACKS_PAGINATION", GetFeedbacksPagination),
		takeLatest("REQUEST_SET_WALLET", SetWallet),
		takeLatest("SEND_TRANSACTION", SendTransaction),
		takeLatest("REQUEST_GET_VENDOR", GetVendor),
		takeLatest("REQUEST_SET_DEFAULT_FIAT", GetDefaultFiat),
		takeLatest("REQUEST_SET_DEFAULT_CRYPTOCURRENCY", GetDefaultCryptocurrency),
		takeLatest("REQUEST_SET_DEFAULT_PAYMENT_METHOD", GetDefaultPaymentMethod),
		takeLatest(
			"REQUEST_SET_CURRENT_CRYPTOCURRENCY_PRICE",
			GetCurrentCryptocurrencyPrice
		),
		takeLatest("REQUEST_SUBMIT_OFFER", SubmitOffer),
		takeLatest("REQUEST_GET_SYSTEM_MESSAGES", GetSystemMessages),
	]);
}
