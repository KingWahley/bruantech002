"use client";

import Image from 'next/image';

export default function ArticleContent({ post }: { post: any }) {
  if (!post) return null;

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
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>        
        </div>

        {/* Author Meta Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 py-6 border-y border-[#C6C6CD] w-full max-w-245 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 grayscale">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold font-mono text-sm md:text-base text-[#0B1C30]">{post.author.name}</span>
              <span className="text-xs md:text-sm text-[#45464D] italic">{post.author.role}</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-200" />
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xs text-[#0B1C30] uppercase tracking-widest font-bold">Published</span>
            <span className="text-sm text-[#45464D]">{post.date} • {post.readTime}</span>
          </div>
        </div>

        {/* Dynamic Body Content */}
        <div className="w-full px-6 md:px-0 max-w-4xl flex flex-col gap-4 text-[#4B5563] text-base md:text-lg leading-relaxed font-light">
          {post.content?.map((block: any, index: number) => {
            
            if (block.type === 'paragraph') {
              return <p key={index}>{block.text}</p>;
            }

            if (block.type === 'italic') {
              return <p key={index} className="italic text-[#4B5563] my-2">{block.text}</p>;
            }

            if (block.type === 'heading2') {
              return (
                <h2 key={index} className="text-2xl md:text-3xl font-bold text-[#111827] mt-6 mb-2 tracking-tight">
                  {block.text}
                </h2>
              );
            }

            if (block.type === 'heading3') {
              return (
                <h3 key={index} className="text-xl md:text-2xl font-bold text-[#111827] mt-6 mb-2 tracking-tight">
                  {block.text}
                </h3>
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
                  <ul className="flex flex-col gap-2 text-sm text-[#4B5563]">
                    {block.items.map((item: string, i: number) => {
                      const indent = item.startsWith('   ') ? 'ml-3 md:ml-6' : 'font-medium mt-2';
                      return <li key={i} className={indent}>{item.trim()}</li>;
                    })}
                  </ul>
                </div>
              );
            }

            return null;
          })}
        </div>

      </div>
    </article>
  );
}