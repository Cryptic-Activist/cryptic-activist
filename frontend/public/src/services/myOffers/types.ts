export type FetchOffersParams = {
  offerType?: string;
  limit: number;
  cursor: string | null;
  userId: string;
};
