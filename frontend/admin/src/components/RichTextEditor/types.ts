import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type CustomElement = {
	type:
		| 'paragraph'
		| 'h1'
		| 'h2'
		| 'blockquote'
		| 'bulleted-list'
		| 'numbered-list'
		| 'list-item'
		| 'code-block';
	align?: 'left' | 'center' | 'right' | 'justify';
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
