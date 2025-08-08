import RichTextEditor from '@/components/RichTextEditor';
import { Descendant } from 'slate';
import { useState } from 'react';

export default function TestEditorPage() {
  const [content, setContent] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'This is an example of a rich text editor.' }],
    },
  ]);

  const handleContentChange = (newContent: Descendant[]) => {
    setContent(newContent);
    console.log(newContent);
  };

  return (
    <div>
      <h1>Rich Text Editor Test Page</h1>
      <RichTextEditor initialValue={content} onChange={handleContentChange} />
      <h2>Current Content (for demonstration):</h2>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}
