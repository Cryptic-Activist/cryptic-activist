import { BaseEditor, Descendant } from 'slate';

import { ReactEditor } from 'slate-react';

export interface SlateEditorProps {
	initialValue: Descendant[];
	onChange: (value: Descendant[]) => void;
}

export type CustomElement = {
	type:
		| 'paragraph'
		| 'heading'
		| 'h1'
		| 'h2'
		| 'blockquote'
		| 'bulleted-list'
		| 'numbered-list'
		| 'list-item'
		| 'code-block'
		| 'link'
		| 'image';
	align?: 'left' | 'center' | 'right' | 'justify';
	url?: string;
	src?: string;
	alt?: string;
	children: CustomText[];
};

export type Formats = 'bold' | 'italic' | 'underline' | 'code';

export type CustomText = {
	text: string;
} & Partial<Record<Formats, boolean>>;

declare module 'slate' {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
