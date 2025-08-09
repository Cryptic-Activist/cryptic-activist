import { CustomElement, CustomText } from './types';
import {
	Descendant,
	Editor,
	Range,
	Element as SlateElement,
	Transforms,
	createEditor
} from 'slate';
import {
	Editable,
	RenderElementProps,
	RenderLeafProps,
	Slate,
	withReact
} from 'slate-react';
import React, { useCallback, useMemo, useState } from 'react';

import styles from './RichTextEditor.module.scss';
import { withHistory } from 'slate-history';

interface RichTextEditorProps {
	initialValue?: Descendant[];
	onChange: (value: Descendant[]) => void;
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const RichTextEditor: React.FC<RichTextEditorProps> = ({
	initialValue,
	onChange
}) => {
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	const [value, setValue] = useState<Descendant[]>(
		initialValue || [
			{
				type: 'paragraph',
				children: [{ text: '' }]
			}
		]
	);

	const renderElement = useCallback(
		(props: RenderElementProps) => <Element {...props} />,
		[]
	);
	const renderLeaf = useCallback(
		(props: RenderLeafProps) => <Leaf {...props} />,
		[]
	);

	return (
		<Slate
			editor={editor}
			initialValue={value}
			onChange={(newValue) => {
				setValue(newValue);
				onChange(newValue);
			}}
		>
			<Toolbar editor={editor} />
			<div className={styles.editorContainer}>
				<Editable
					className={styles.editable}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder="Enter some rich text..."
					spellCheck
					autoFocus
					onKeyDown={(event) => {
						if (event.key === '`' && event.ctrlKey) {
							event.preventDefault();
							CustomEditor.toggleCodeBlock(editor);
						}
					}}
				/>
			</div>
		</Slate>
	);
};

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
	return (
		<div className={styles.toolbar}>
			<MarkButton editor={editor} format="bold">
				Bold
			</MarkButton>
			<MarkButton editor={editor} format="italic">
				Italic
			</MarkButton>
			<MarkButton editor={editor} format="underline">
				Underline
			</MarkButton>
			<MarkButton editor={editor} format="code">
				Code
			</MarkButton>
			<BlockButton editor={editor} format="h1">
				H1
			</BlockButton>
			<BlockButton editor={editor} format="h2">
				H2
			</BlockButton>
			<BlockButton editor={editor} format="blockquote">
				Blockquote
			</BlockButton>
			<BlockButton editor={editor} format="numbered-list">
				Numbered List
			</BlockButton>
			<BlockButton editor={editor} format="bulleted-list">
				Bulleted List
			</BlockButton>
			<LinkButton editor={editor}>Link</LinkButton>
			<ImageButton editor={editor}>Image</ImageButton>
		</div>
	);
};

const CustomEditor = {
	isMarkActive(editor: Editor, format: keyof Omit<CustomText, 'text'>) {
		const marks = Editor.marks(editor) as Partial<
			Record<keyof Omit<CustomText, 'text'>, boolean>
		>;
		return marks ? marks[format] === true : false;
	},

	toggleMark(editor: Editor, format: keyof Omit<CustomText, 'text'>) {
		const isActive = CustomEditor.isMarkActive(editor, format);

		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	},

	isBlockActive(
		editor: Editor,
		format: CustomElement['type'] | CustomElement['align'],
		blockType = 'type'
	) {
		const { selection } = editor;
		if (!selection) return false;

		const [match] = Array.from(
			Editor.nodes(editor, {
				at: Editor.unhangRange(editor, selection),
				match: (n): n is CustomElement => {
					if (!SlateElement.isElement(n)) {
						return false;
					}
					const customNode = n as CustomElement;
					if (blockType === 'type') {
						return 'type' in customNode && customNode.type === format;
					} else if (blockType === 'align') {
						return 'align' in customNode && customNode.align === format;
					}
					return false;
				}
			})
		);

		return !!match;
	},

	toggleBlock(
		editor: Editor,
		format: CustomElement['type'] | CustomElement['align']
	) {
		const isActive = CustomEditor.isBlockActive(
			editor,
			format,
			TEXT_ALIGN_TYPES.includes(format as string) ? 'align' : 'type'
		);
		const isList = LIST_TYPES.includes(format as string);

		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				LIST_TYPES.includes((n as CustomElement).type as string) &&
				!TEXT_ALIGN_TYPES.includes(format as string),
			split: true
		});
		let newProperties: Partial<SlateElement>;
		if (TEXT_ALIGN_TYPES.includes(format as string)) {
			newProperties = {
				align: isActive ? undefined : (format as CustomElement['align'])
			};
		} else {
			newProperties = {
				type: isActive
					? 'paragraph'
					: isList
					? 'list-item'
					: (format as CustomElement['type'])
			};
		}
		Transforms.setNodes<SlateElement>(editor, newProperties);

		if (!isActive && isList) {
			const block: CustomElement = {
				type: format as CustomElement['type'],
				children: []
			};
			Transforms.wrapNodes(editor, block);
		}
	},

	toggleCodeBlock(editor: Editor) {
		const isActive = CustomEditor.isBlockActive(editor, 'code-block');
		Transforms.setNodes(
			editor,
			{
				type: isActive
					? ('paragraph' as CustomElement['type'])
					: ('code-block' as CustomElement['type'])
			},
			// @ts-expect-error: n type
			{ match: (n) => Editor.isBlock(editor, n) }
		);
	},

	isLinkActive(editor: Editor) {
		const [link] = Editor.nodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				(n as CustomElement).type === 'link'
		});
		return !!link;
	},

	unwrapLink(editor: Editor) {
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				(n as CustomElement).type === 'link'
		});
	},

	wrapLink(editor: Editor, url: string) {
		if (CustomEditor.isLinkActive(editor)) {
			CustomEditor.unwrapLink(editor);
		}

		const { selection } = editor;
		const isCollapsed = selection && Range.isCollapsed(selection);

		const link: CustomElement = {
			type: 'link',
			url,
			children: isCollapsed ? [{ text: url }] : []
		};

		if (isCollapsed) {
			Transforms.insertNodes(editor, link);
		} else {
			Transforms.wrapNodes(editor, link, { split: true });
			Transforms.collapse(editor, { edge: 'end' });
		}
	},

	insertImage(editor: Editor, src: string, alt: string) {
		const text = { text: '' };
		const image: CustomElement = { type: 'image', src, alt, children: [text] };
		Transforms.insertNodes(editor, image);
	}
};

const Element: React.FC<RenderElementProps> = ({
	attributes,
	children,
	element
}) => {
	const customElement = element as CustomElement;
	const style = { textAlign: customElement.align };
	switch (customElement.type) {
		case 'blockquote':
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			);
		case 'bulleted-list':
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case 'h1':
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			);
		case 'h2':
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			);
		case 'list-item':
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);
		case 'numbered-list':
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);
		case 'code-block':
			return (
				<pre style={style} {...attributes}>
					<code>{children}</code>
				</pre>
			);
		case 'link':
			return (
				<a href={customElement.url} {...attributes}>
					{children}
				</a>
			);
		case 'image':
			return (
				<img
					src={customElement.src}
					alt={customElement.alt}
					{...attributes}
					style={{ maxWidth: '100%' }}
				/>
			);
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
	// Ensure leaf properties are correctly applied
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	return <span {...attributes}>{children}</span>;
};

const MarkButton: React.FC<{
	editor: Editor;
	format: keyof Omit<CustomText, 'text'>;
	children: React.ReactNode;
}> = ({ editor, format, children }) => {
	const isActive = CustomEditor.isMarkActive(editor, format);
	return (
		<button
			className={styles.toolbarButton}
			data-active={isActive}
			onMouseDown={(event) => {
				event.preventDefault();
				CustomEditor.toggleMark(editor, format);
			}}
		>
			{children}
		</button>
	);
};

const BlockButton: React.FC<{
	editor: Editor;
	format: CustomElement['type'] | CustomElement['align'];
	children: React.ReactNode;
}> = ({ editor, format, children }) => {
	const isActive = CustomEditor.isBlockActive(editor, format);
	return (
		<button
			className={styles.toolbarButton}
			data-active={isActive}
			onMouseDown={(event) => {
				event.preventDefault();
				CustomEditor.toggleBlock(editor, format);
			}}
		>
			{children}
		</button>
	);
};

const LinkButton: React.FC<{ editor: Editor; children: React.ReactNode }> = ({
	editor,
	children
}) => {
	const isActive = CustomEditor.isLinkActive(editor);
	return (
		<button
			className={styles.toolbarButton}
			data-active={isActive}
			onMouseDown={(event) => {
				event.preventDefault();
				const url = window.prompt('Enter the URL:');
				if (url) {
					CustomEditor.wrapLink(editor, url);
				}
			}}
		>
			{children}
		</button>
	);
};

const ImageButton: React.FC<{ editor: Editor; children: React.ReactNode }> = ({
	editor,
	children
}) => {
	return (
		<button
			className={styles.toolbarButton}
			onMouseDown={(event) => {
				event.preventDefault();
				const src = window.prompt('Enter the image URL:');
				if (src) {
					const alt = window.prompt('Enter image alt text (optional):') || '';
					CustomEditor.insertImage(editor, src, alt);
				}
			}}
		>
			{children}
		</button>
	);
};

export default RichTextEditor;
