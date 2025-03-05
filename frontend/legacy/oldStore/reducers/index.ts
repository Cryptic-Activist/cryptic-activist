import { combineReducers } from "redux";

import app from "./app";
import create from "./create";
import cryptocurrencies from "./cryptocurrencies";
import currentOffers from "./currentOffers";
import feedbacks from "./feedbacks";
import fiats from "./fiats";
import navigationBar from "./navigationBar";
import offer from "./offer";
import offers from "./offers";
import user from "./user";
import vendor from "./vendor";
import wallet from "./wallet";
import privateKeys from "./privateKeys";
import systemMessages from "./systemMessages";

export default combineReducers({
	app,
	create,
	cryptocurrencies,
	currentOffers,
	feedbacks,
	fiats,
	navigationBar,
	offer,
	offers,
	privateKeys,
	user,
	vendor,
	systemMessages,
	wallet,
});
