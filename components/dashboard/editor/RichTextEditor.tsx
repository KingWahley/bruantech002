'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link as LinkExtension } from '@tiptap/extension-link';
import { Image as ImageExtension } from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Unlink,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface RichTextEditorProps {
  value: any;
  onChange: (value: any) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  // Convert existing block array or string into HTML string for Tiptap
  const initialContent = typeof value === 'string' && value
    ? value
    : Array.isArray(value)
    ? value
        .map((block: any) => {
          if (!block) return '';
          if (typeof block === 'string') return `<p>${block}</p>`;
          if (block.type === 'paragraph') return `<p>${block.text || ''}</p>`;
          if (block.type === 'heading2' || block.type === 'h2') return `<h2>${block.text || ''}</h2>`;
          if (block.type === 'heading3' || block.type === 'h3') return `<h3>${block.text || ''}</h3>`;
          if (block.type === 'italic') return `<p><em>${block.text || ''}</em></p>`;
          if (block.type === 'blockquote') return `<blockquote>${block.text || ''}</blockquote>`;
          if (block.type === 'bulletList' || block.type === 'ul') {
            const items = block.items?.map((i: string) => `<li>${i}</li>`).join('') || '';
            return `<ul>${items}</ul>`;
          }
          if (block.type === 'orderedList' || block.type === 'ol') {
            const items = block.items?.map((i: string) => `<li>${i}</li>`).join('') || '';
            return `<ol>${items}</ol>`;
          }
          if (block.html) return block.html;
          if (block.text) return `<p>${block.text}</p>`;
          return '';
        })
        .join('')
    : '<p>Write your article content here...</p>';

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      TableKit.configure({
        table: {
          resizable: true,
        },
      }),
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      transformPastedHTML(html) {
        return html;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL link:', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

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

        <div className="w-px h-5 bg-zinc-800 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
            editor.isActive('link') ? 'bg-teal-500/20 text-teal-400 font-bold' : ''
          }`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {editor.isActive('link') && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-2 rounded-lg hover:bg-zinc-800 text-rose-400 transition-colors"
            title="Remove Link"
          >
            <Unlink className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          title="Insert Image URL"
        >
          <ImageIcon className="w-4 h-4" />
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
