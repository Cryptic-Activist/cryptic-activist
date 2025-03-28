export type ProgressBarProps = {
  steps: string[];
  currentStep: number;
  onClickEvents: { [key: number]: () => void };
};
