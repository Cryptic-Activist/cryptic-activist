export type MinusPLusInputProps = {
  value: number;
  onChange: (value: number) => void;
  symbol?: string;
  step?: number;
  min?: number;
  max?: number;
  hasButtons?: boolean;
  isDisabled?: boolean;
};
