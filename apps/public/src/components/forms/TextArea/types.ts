export type TextAreaProps = {
  id: string;
  label?: string;
  info?: string;
  onChange: (value: string) => void;
  value: string;
  required?: boolean;
  errorMessage?: string;
};
