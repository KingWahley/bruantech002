'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
} from 'lucide-react';

interface RichTextEditorProps {
  value: any;
  onChange: (value: any) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  // Convert existing block array or string into HTML string for Tiptap
  const initialContent = Array.isArray(value)
    ? value
        .map((block: any) => {
          if (block.type === 'paragraph') return `<p>${block.text}</p>`;
          if (block.type === 'heading2') return `<h2>${block.text}</h2>`;
          if (block.type === 'heading3') return `<h3>${block.text}</h3>`;
          if (block.type === 'italic') return `<p><em>${block.text}</em></p>`;
          return '';
        })
        .join('')
    : typeof value === 'string' && value
    ? value
    : '<p>Write your article content here...</p>';

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const contentBlocks: any[] = [];

      json.content?.forEach((item: any) => {
        if (item.type === 'paragraph') {
          const isItalic = item.content?.some((c: any) => c.marks?.some((m: any) => m.type === 'italic'));
          const text = item.content?.map((c: any) => c.text).join('') || '';
          contentBlocks.push({
            type: isItalic ? 'italic' : 'paragraph',
            text,
          });
        } else if (item.type === 'heading') {
          const level = item.attrs?.level;
          const text = item.content?.map((c: any) => c.text).join('') || '';
          contentBlocks.push({
            type: level === 2 ? 'heading2' : 'heading3',
            text,
          });
        }
      });

      onChange(contentBlocks.length > 0 ? contentBlocks : editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/60 flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-950 border-b border-zinc-800 text-zinc-300">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('bold') ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('italic') ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-zinc-800 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-zinc-800 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('bulletList') ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('orderedList') ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-zinc-800 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('blockquote') ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('codeBlock') ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none p-4 min-h-[300px] focus:outline-none text-zinc-200 text-sm leading-relaxed"
      />
    </div>
  );
}
