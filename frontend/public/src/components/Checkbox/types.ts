export type CheckboxProps = {
  label: string;
  checked: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  errorMessage?: string;
  register?: any;
};
