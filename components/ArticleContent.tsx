"use client";

import Image from 'next/image';

export default function ArticleContent({ post }: { post: any }) {
  if (!post) return null;

  const heroImageSrc = post.image && typeof post.image === 'string' && post.image.trim() !== '' ? post.image : '/images/default.jpg';
  const authorAvatarSrc = post.author?.avatar && typeof post.author.avatar === 'string' && post.author.avatar.trim() !== '' ? post.author.avatar : null;
  const authorName = post.author?.name || 'ADMIN';
  const authorRole = post.author?.role || 'Author';

  return (
    <article className="w-full bg-white pb-20">
      <div className="w-full flex flex-col items-center">
        
        <div className='bg-[#EEECFF] relative w-full pt-10 h-100 md:h-130 mb-20 md:mb-45'>
          {/* Title */}
          <h1 className="max-w-[95%] md:max-w-[85%] mx-auto text-2xl md:text-4xl lg:text-5xl font-bold font-mono text-[#111827] tracking-tight leading-[1.1] text-left mb-8">
            {post.title}
          </h1>

          {/* Hero Image */}
          <div className="relative w-full max-w-6xl mx-auto h-65 md:h-120 overflow-hidden shadow-lg mb-12">
            <Image 
              src={heroImageSrc}
              alt={post.title || 'Article Cover'}
              fill
              className="object-cover"
              priority
            />
          </div>        
        </div>

        {/* Author Meta Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 py-6 border-y border-[#C6C6CD] w-full max-w-245 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xl font-mono">
              {authorAvatarSrc ? (
                <Image src={authorAvatarSrc} alt={authorName} fill className="object-cover" />
              ) : (
                <span>{authorName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold font-mono text-sm md:text-base text-[#0B1C30]">{authorName}</span>
              <span className="text-xs md:text-sm text-[#45464D] italic">{authorRole}</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-200" />
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xs text-[#0B1C30] uppercase tracking-widest font-bold">Published</span>
            <span className="text-sm text-[#45464D]">{post.date || 'Recent'} • {post.readTime || post.read_time || '5 min read'}</span>
          </div>
        </div>

        {/* Dynamic Body Content */}
        <div className="w-full px-6 md:px-0 max-w-4xl article-body text-[#4B5563] text-base md:text-lg leading-relaxed font-light">
          {typeof post.content === 'string' ? (
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : Array.isArray(post.content) ? (
            post.content.map((block: any, index: number) => {
              if (!block) return null;

              if (typeof block === 'string') {
                return <p key={index}>{block}</p>;
              }

              if (block.type === 'paragraph') {
                return <p key={index}>{block.text}</p>;
              }

              if (block.type === 'italic') {
                return <p key={index} className="italic text-[#4B5563] my-2">{block.text}</p>;
              }

              if (block.type === 'heading2' || block.type === 'h2') {
                return (
                  <h2 key={index}>
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'heading3' || block.type === 'h3') {
                return (
                  <h3 key={index}>
                    {block.text}
                  </h3>
                );
              }

              if (block.type === 'bulletList' || block.type === 'ul') {
                return (
                  <ul key={index}>
                    {block.items?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'orderedList' || block.type === 'ol') {
                return (
                  <ol key={index}>
                    {block.items?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                );
              }

              if (block.type === 'blockquote') {
                return (
                  <blockquote key={index}>
                    {block.text}
                  </blockquote>
                );
              }

              // The Contents Overview Box
              if (block.type === 'toc') {
                return (
                  <div key={index} className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-6 md:p-8 my-4 md:max-w-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-[#111827]">Contents Overview</h4>
                      <span className="text-[#9CA3AF] text-sm">[-]</span>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-[#4B5563] !list-none !pl-0">
                      {block.items?.map((item: string, i: number) => {
                        const indent = item.startsWith('   ') ? 'ml-3 md:ml-6' : 'font-medium mt-2';
                        return <li key={i} className={`${indent} !my-0 !pl-0`}>{item.trim()}</li>;
                      })}
                    </ul>
                  </div>
                );
              }

              if (block.text) {
                return <p key={index}>{block.text}</p>;
              }

              if (block.html) {
                return <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />;
              }

              return null;
            })
          ) : null}
        </div>

      </div>
    </article>
  );
}