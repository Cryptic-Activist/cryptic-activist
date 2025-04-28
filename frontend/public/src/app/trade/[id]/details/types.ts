import { Type } from '@/components/FeedbackSelector/types';

export type TradeDetailsProps = {
  trade: any;
  app: any;
  user: any;
};

export type FeedbackProps = {
  user: any;
  feedback: {
    type: Type;
    message: string;
    trader: any;
  };
};
