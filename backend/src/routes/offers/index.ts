import { Application } from 'express';
import feedback from './feedback';
import feedbacks from './feedbacks';
import offer from './offer';
import offers from './offers';
import paymentMethod from './paymentMethod';
import paymentMethods from './paymentMethods';

export default (app: Application) => {
  return {
    init: () => {
      app.use('/feedback', feedback);
      app.use('/feedbacks', feedbacks);
      app.use('/offer', offer);
      app.use('/offers', offers);
      app.use('/payment-method', paymentMethod);
      app.use('/payment-methods', paymentMethods);
    },
  };
};
