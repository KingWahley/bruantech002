import Image from 'next/image';
import Link from 'next/link';
import { bruantechBlogs } from '@/constants';

export default function BruantechBlog() {
  return (
    <section className="w-full bg-white py-20 border-t border-gray-100">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col items-center">
        
        <h2 className="text-3xl md:text-5xl font-bold font-mono text-black mb-16 tracking-tight">
          The Bruantech Blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {bruantechBlogs.map((blog, index) => (
            <Link
              key={index}
              href={`/blog/${blog.slug}`}
              className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all bg-white group cursor-pointer"
            >
              <div className="relative w-full aspect-16/10 bg-gray-100 overflow-hidden">
                <Image 
                  src={blog.image || '/images/default.jpg'}
                  alt={blog.title || 'Blog Post'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className='absolute top-2 right-8 bg-[#1F2937B2] text-white p-2 rounded-sm uppercase text-xs'>
                  {blog.category}
                </div>
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 line-clamp-3 group-hover:text-[#5EB3C3] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>
                <span className="mt-auto text-xs font-bold uppercase tracking-widest text-[#111111] group-hover:text-[#5EB3C3] transition-colors">
                  READ MORE »
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}