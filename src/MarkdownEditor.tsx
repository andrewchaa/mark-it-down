import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { createLowlight } from 'lowlight';

interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '<h1>Hello World</h1><p>Start editing your content here...</p>',
  onChange,
  placeholder = 'Start typing your content...'
}) => {
  const lowlight = createLowlight();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ 
        borderBottom: '1px solid #ccc', 
        padding: '8px', 
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px'
      }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('bold') ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('italic') ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('underline') ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('code') ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          Code
        </button>
        <span style={{ borderLeft: '1px solid #ddd', margin: '0 4px' }}></span>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('heading', { level: 1 }) ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('heading', { level: 2 }) ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('heading', { level: 3 }) ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          H3
        </button>
        <span style={{ borderLeft: '1px solid #ddd', margin: '0 4px' }}></span>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('bulletList') ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('orderedList') ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          Numbered List
        </button>
        <span style={{ borderLeft: '1px solid #ddd', margin: '0 4px' }}></span>
        <button
          onClick={() => {
            const url = window.prompt('URL:');
            if (url) {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
          }}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('link') ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          Link
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Image URL:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Image
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: editor.isActive('codeBlock') ? '#e0e0e0' : 'white',
            cursor: 'pointer'
          }}
        >
          Code Block
        </button>
        <span style={{ borderLeft: '1px solid #ddd', margin: '0 4px' }}></span>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Redo
        </button>
      </div>
      
      {/* Editor Content */}
      <div style={{ minHeight: '400px', padding: '16px' }}>
        <EditorContent 
          editor={editor} 
          style={{ 
            minHeight: '350px',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;