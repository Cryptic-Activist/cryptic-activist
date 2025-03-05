import { IState } from '../../types/store/reducers';

export const appSelector = (state: IState) => state.app;
export const cryptocurrenciesSelector = (state: IState) => state.app;
export const currentOffersSelect = (state: IState) => state.currentOffers;
export const feedbacksSelect = (state: IState) => state.feedbacks;
export const fiatsSelect = (state: IState) => state.fiats;
export const navigationBarSelector = (state: IState) => state.navigationBar;
export const offerSelect = (state: IState) => state.offer;
export const offersSelect = (state: IState) => state.offers;
export const userSelector = (state: IState) => state.user;
