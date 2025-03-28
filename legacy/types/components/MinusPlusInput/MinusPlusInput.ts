export interface IMinusPlusInput {
  symbol?: string;
  initialValue: number;
  step: number;
  changeNumber: (number: number) => void;
  min: number;
  max?: number;
  buttons: boolean;
  disableInput: boolean;
  width: string;
  fitContent: boolean;
}
