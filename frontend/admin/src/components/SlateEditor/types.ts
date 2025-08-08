import { Descendant } from 'slate';

export interface SlateEditorProps {
  initialValue: Descendant[];
  onChange: (value: Descendant[]) => void;
}