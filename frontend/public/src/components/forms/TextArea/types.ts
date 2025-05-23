export type TextAreaProps = {
  id: string;
  label?: string;
  info?: string;
  onChange?: (value: string) => void;
  value?: any;
  required?: boolean;
  errorMessage?: string;
  placeholder?: string;
  register?: any;
  name?: string;
  disabled?: boolean;
};
