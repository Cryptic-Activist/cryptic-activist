import { Store } from "redux";
import { Task } from "redux-saga";
import {
	IApp,
	ICreate,
	ICryptocurrencies,
	ICurrentOffers,
	IVendor,
} from "../reducers";

export interface SagaStore extends Store {
	sagaTask?: Task;
	app: IApp;
	create: ICreate;
	cryptocurrencies: ICryptocurrencies;
	currentOffers: ICurrentOffers;
	vendor: IVendor;
}
