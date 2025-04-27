import { ReactElement } from 'react';

export type Type = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export type FeedbackSelectorProps = {
  errorMessage?: string;
  onChange: (type: Type) => void;
};

export type FeedbackList = {
  label: ReactElement;
  value: Type;
}[];
