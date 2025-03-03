export type Item = {
  value: any;
  label: string;
  description?: string;
};

export type RadioProps = {
  items: Item[];
  onChange: (value: Item) => void;
  orientation?: 'vertical' | 'horizontal';
};
