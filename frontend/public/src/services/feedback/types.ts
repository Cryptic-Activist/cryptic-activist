export type OnSubmitFeedback = {
  tradeId: string;
  message: string;
  type: string;
};

type Evidence = {
  fileName: string;
  url: string;
};

export type OnSubmitMoreEvidences = {
  disputeId: string;
  userId: string;
  evidences: Evidence[];
};
