'use client';

import React from 'react';
import {
	type ContentBlock,
	type ContentState,
	Editor,
	EditorState,
	RichUtils,
	AtomicBlockUtils,
	CompositeDecorator
} from 'draft-js';
import 'draft-js/dist/Draft.css';

import styles from './styles.module.scss';

interface LinkProps {
	entityKey: string;
	contentState: ContentState;
	children: React.ReactNode;
}

const Link = ({ entityKey, contentState, children }: LinkProps) => {
	const { url } = contentState.getEntity(entityKey).getData();
	return (
		<a href={url} className={styles.link}>
			{children}
		</a>
	);
};

interface ImageProps {
	block: ContentBlock;
	contentState: ContentState;
}

const Image = ({ block, contentState }: ImageProps) => {
	const entity = contentState.getEntity(block.getEntityAt(0));
	const { src } = entity.getData();
	return <img src={src} alt="" className={styles.image} />;
};

const decorator = new CompositeDecorator([
	{
		strategy: (contentBlock, callback, contentState) => {
			contentBlock.findEntityRanges((character) => {
				const entityKey = character.getEntity();
				return (
					entityKey !== null &&
					contentState.getEntity(entityKey).getType() === 'LINK'
				);
			}, callback);
		},
		component: Link
	}
]);

interface RichTextEditorProps {
	editorState: EditorState;
	onChange: (editorState: EditorState) => void;
}

const RichTextEditor = ({ editorState, onChange }: RichTextEditorProps) => {
	const handleKeyCommand = (command: string, state: EditorState) => {
		const newState = RichUtils.handleKeyCommand(state, command);
		if (newState) {
			onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	const toggleInlineStyle = (inlineStyle: string) => {
		onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	};

	const toggleBlockType = (blockType: string) => {
		onChange(RichUtils.toggleBlockType(editorState, blockType));
	};

	const promptForLink = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const selection = editorState.getSelection();
		if (!selection.isCollapsed()) {
			const url = window.prompt('Enter the URL');
			if (!url) return;
			const contentState = editorState.getCurrentContent();
			const contentStateWithEntity = contentState.createEntity(
				'LINK',
				'MUTABLE',
				{ url }
			);
			const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
			const newEditorState = EditorState.set(editorState, {
				currentContent: contentStateWithEntity
			});
			onChange(
				RichUtils.toggleLink(
					newEditorState,
					newEditorState.getSelection(),
					entityKey
				)
			);
		}
	};

	const promptForImage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const url = window.prompt('Enter the Image URL');
		if (!url) return;
		const contentState = editorState.getCurrentContent();
		const contentStateWithEntity = contentState.createEntity(
			'IMAGE',
			'IMMUTABLE',
			{ src: url }
		);
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
		const newEditorState = AtomicBlockUtils.insertAtomicBlock(
			editorState,
			entityKey,
			' '
		);
		onChange(newEditorState);
	};

	const mediaBlockRenderer = (block: ContentBlock) => {
		if (block.getType() === 'atomic') {
			return {
				component: Image,
				editable: false
			};
		}
		return null;
	};

	const currentStyle = editorState.getCurrentInlineStyle();
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className={styles.editorContainer}>
			<div className={styles.toolbar}>
				<button
					type="button"
					className={currentStyle.has('BOLD') ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleInlineStyle('BOLD');
					}}
				>
					Bold
				</button>
				<button
					type="button"
					className={currentStyle.has('ITALIC') ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleInlineStyle('ITALIC');
					}}
				>
					Italic
				</button>
				<button
					type="button"
					className={currentStyle.has('UNDERLINE') ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleInlineStyle('UNDERLINE');
					}}
				>
					Underline
				</button>
				<button
					type="button"
					className={currentStyle.has('STRIKETHROUGH') ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleInlineStyle('STRIKETHROUGH');
					}}
				>
					Strikethrough
				</button>
				<button
					type="button"
					className={blockType === 'unordered-list-item' ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleBlockType('unordered-list-item');
					}}
				>
					Unordered List
				</button>
				<button
					type="button"
					className={blockType === 'ordered-list-item' ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleBlockType('ordered-list-item');
					}}
				>
					Ordered List
				</button>
				<button
					type="button"
					className={blockType === 'header-one' ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleBlockType('header-one');
					}}
				>
					H1
				</button>
				<button
					type="button"
					className={blockType === 'header-two' ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleBlockType('header-two');
					}}
				>
					H2
				</button>
				<button
					type="button"
					className={blockType === 'header-three' ? styles.active : ''}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleBlockType('header-three');
					}}
				>
					H3
				</button>
				<button type="button" onMouseDown={promptForLink}>
					Link
				</button>
				<button type="button" onMouseDown={promptForImage}>
					Image
				</button>
			</div>
			<div className={styles.editor}>
				<Editor
					editorState={EditorState.set(editorState, { decorator })}
					handleKeyCommand={handleKeyCommand}
					onChange={onChange}
					blockRendererFn={mediaBlockRenderer}
				/>
			</div>
		</div>
	);
};

export default RichTextEditor;
