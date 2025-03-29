export type InputNumberProps = {
  value: number;
  onChange: (value: number) => void;
  symbol?: string;
  step?: number;
  min?: number;
  max?: number;
  hasButtons?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  label?: string;
  id: string;
  width?: string;
};
