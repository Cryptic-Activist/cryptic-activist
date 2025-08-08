import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor, Element as SlateElement, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { CustomElement, CustomText } from './types';

interface RichTextEditorProps {
  initialValue?: Descendant[];
  onChange: (value: Descendant[]) => void;
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(
    initialValue || [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]
  );

  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

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
      <Editable
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
    </Slate>
  );
};

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <div style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
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
    </div>
  );
};

const CustomEditor = {
  isMarkActive(editor: Editor, format: keyof Omit<CustomText, 'text'>) {
    const marks = Editor.marks(editor);
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

  isBlockActive(editor: Editor, format: CustomElement['type'] | CustomElement['align'], blockType = 'type') {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n): n is CustomElement => {
          if (!SlateElement.isElement(n)) {
            return false;
          }
          // Now n is guaranteed to be a SlateElement, we can cast it to CustomElement
          // and check for the presence of the 'type' or 'align' property.
          const customNode = n as CustomElement;
          if (blockType === 'type') {
            return 'type' in customNode && customNode.type === format;
          } else if (blockType === 'align') {
            return 'align' in customNode && customNode.align === format;
          }
          return false;
        },
      })
    );

    return !!match;
  },

  toggleBlock(editor: Editor, format: CustomElement['type'] | CustomElement['align']) {
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
      split: true,
    });
    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format as string)) {
      newProperties = {
        align: isActive ? undefined : (format as CustomElement['align']),
      };
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : (format as CustomElement['type']),
      };
    }
    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
      const block: CustomElement = { type: format as CustomElement['type'], children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isBlockActive(editor, 'code-block');
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' as CustomElement['type'] : 'code-block' as CustomElement['type'] },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
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
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  const customLeaf = leaf as CustomText;
  if (customLeaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (customLeaf.italic) {
    children = <em>{children}</em>;
  }

  if (customLeaf.underline) {
    children = <u>{children}</u>;
  }

  if (customLeaf.code) {
    children = <code>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};

const MarkButton: React.FC<{ editor: Editor; format: keyof Omit<CustomText, 'text'>; children: React.ReactNode }> = ({
  editor,
  format,
  children,
}) => {
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
    >
      {children}
    </button>
  );
};

const BlockButton: React.FC<{ editor: Editor; format: CustomElement['type'] | CustomElement['align']; children: React.ReactNode }> = ({
  editor,
  format,
  children,
}) => {
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
    >
      {children}
    </button>
  );
};

export default RichTextEditor;
