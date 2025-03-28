export type Item = {
  value: any;
  label: string;
  description?: string;
};

export type RadioProps = {
  items: Item[];
  onChange: (value: Item) => void;
  value?: string | number;
  orientation?: 'vertical' | 'horizontal';
};
