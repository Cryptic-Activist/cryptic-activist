export type LinkProps = {
  href?: string;
  label: string;
  type?: 'button' | 'link';
  onClick?: () => void;
};
