export type FeedbackCountProps = {
  feedbacksCount?: {
    negative: number;
    neutral: number;
    positive: number;
  };
};

export type DialogProps = {
  message: string;
  style: string;
};
