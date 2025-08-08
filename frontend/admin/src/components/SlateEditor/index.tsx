'use client';

import React, { useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import { SlateEditorProps } from './types';

interface CustomElement {
  type: 'paragraph' | 'heading' | 'list-item';
  children: CustomText[];
}

interface CustomText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

declare module 'slate' {
  interface CustomTypes {
    Element: CustomElement;
    Text: CustomText;
  }
}

const SlateEditor: React.FC<SlateEditorProps> = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())),
   []);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'heading':
        return <h1 {...props.attributes}>{props.children}</h1>;
      case 'list-item':
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? 'bold' : 'normal',
          fontStyle: props.leaf.italic ? 'italic' : 'normal',
          textDecoration: props.leaf.underline ? 'underline' : 'none',
        }}
      >
        {props.children}
      </span>
    );
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      case 'b':
        event.preventDefault();
        editor.toggleMark('bold');
        break;
      case 'i':
        event.preventDefault();
        editor.toggleMark('italic');
        break;
      case 'u':
        event.preventDefault();
        editor.toggleMark('underline');
        break;
    }
  };

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
        placeholder="Enter some rich text..."
      />
    </Slate>
  );
};

export default SlateEditor;
