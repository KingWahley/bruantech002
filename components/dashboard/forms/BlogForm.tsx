'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogPostSchema, BlogPostFormValues } from '@/lib/validations/blog';
import ImageUploader from '@/components/dashboard/upload/ImageUploader';
import RichTextEditor from '@/components/dashboard/editor/RichTextEditor';
import ConfirmModal from '@/components/dashboard/ui/ConfirmModal';
import { createBlogPost, updateBlogPost, getBlogCategories } from '@/lib/actions/blog';
import { slugify } from '@/lib/utils';
import { ArrowLeft, Save, User, Clock, FileText, Globe, Eye, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface BlogFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const DEFAULT_CATEGORIES = ['GOOGLE', 'CLOUD ENGINEERING', 'SOFTWARE DEVELOPMENT', 'E-COMMERCE', 'GENERAL'];

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [categoriesList, setCategoriesList] = useState<string[]>(DEFAULT_CATEGORIES);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');

  useEffect(() => {
    async function loadCategories() {
      const dbCategories = await getBlogCategories();
      const initialCat = initialData?.category ? initialData.category.toUpperCase().trim() : '';
      const combined = Array.from(new Set([...DEFAULT_CATEGORIES, ...dbCategories, ...(initialCat ? [initialCat] : [])])).sort();
      setCategoriesList(combined);
    }
    loadCategories();
  }, [initialData?.category]);

  const defaultValues: BlogPostFormValues = {
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    image: initialData?.image || '',
    category: initialData?.category || 'GOOGLE',
    authorName: initialData?.author?.name || 'ADMIN',
    authorRole: initialData?.author?.role || 'Design Director',
    authorAvatar: initialData?.author?.avatar || '',
    readTime: initialData?.read_time || initialData?.readTime || '8 min read',
    content: initialData?.content || [],
    status: initialData?.status || 'draft',
    featured: initialData?.featured || false,
    meta_title: initialData?.meta_title || initialData?.title || '',
    meta_description: initialData?.meta_description || initialData?.excerpt || '',
  };

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues,
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;

  const currentTitle = watch('title');
  const currentSlug = watch('slug');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('title', val);
    if (!isEditing || !currentSlug) {
      setValue('slug', slugify(val));
    }
  };

  const onSubmit = async (values: BlogPostFormValues) => {
    setSubmitting(true);
    let result;

    if (isEditing && initialData?.id) {
      result = await updateBlogPost(initialData.id, values);
    } else {
      result = await createBlogPost(values);
    }

    setSubmitting(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        isEditing
          ? 'Blog post updated successfully'
          : values.status === 'published'
          ? 'Article published successfully!'
          : 'Draft saved successfully'
      );
      router.push('/dashboard/blog');
      router.refresh();
    }
  };

  const onInvalid = (formErrors: any) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstField = errorKeys[0];
      const message = formErrors[firstField]?.message || `Please check the ${firstField} field.`;
      toast.error(`Validation Notice: ${message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/blog"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-mono text-zinc-100">
              {isEditing ? `Edit Post: ${initialData?.title}` : 'Write New Blog Post'}
            </h1>
            <p className="text-xs text-zinc-400">
              Content structure mirrors the public ArticleContent layout
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            {previewMode ? 'Edit Mode' : 'Live Preview'}
          </button>
          <button
            type="button"
            onClick={() => setShowDiscardModal(true)}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-500/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {submitting ? 'Saving...' : isEditing ? 'Update Post' : 'Save Article'}
          </button>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Title, Excerpt, Rich Text Editor */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card: Basic Info */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Article Headline & Metadata
            </h2>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Article Title *</label>
              <input
                type="text"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="Launching Your Ecommerce Venture in 2026..."
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-base font-semibold text-zinc-100 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {errors.title && <span className="text-xs text-rose-400">{errors.title.message}</span>}
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">URL Slug *</label>
              <input
                type="text"
                {...register('slug')}
                placeholder="launching-your-ecommerce-venture-in-2026"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 font-mono focus:outline-none focus:border-purple-500 transition-colors"
              />
              {errors.slug && <span className="text-xs text-rose-400">{errors.slug.message}</span>}
            </div>

            {/* Excerpt */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Article Excerpt / Summary</label>
              <textarea
                {...register('excerpt')}
                rows={3}
                placeholder="Short introductory summary displayed on the blog list grid..."
                className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Card: TipTap Rich Text Editor */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-zinc-100 font-mono">Article Content Body</h2>
            <RichTextEditor
              value={watch('content')}
              onChange={(contentBlocks) => setValue('content', contentBlocks)}
            />
          </div>

        </div>

        {/* Right Column: Featured Image, Category, Author, Publishing */}
        <div className="flex flex-col gap-6">
          
          {/* Status & Category */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Publishing Options
            </h3>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-300">Category</label>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(!isAddingCategory)}
                  className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  {isAddingCategory ? 'Select Existing' : 'New Category'}
                </button>
              </div>

              {isAddingCategory ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    placeholder="Enter custom category..."
                    className="flex-1 px-3 py-2 bg-zinc-950 border border-purple-500/50 rounded-xl text-xs text-zinc-100 uppercase font-mono focus:outline-none focus:border-purple-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const trimmed = newCategoryInput.trim().toUpperCase();
                        if (trimmed) {
                          if (!categoriesList.includes(trimmed)) {
                            setCategoriesList((prev) => [...prev, trimmed].sort());
                          }
                          setValue('category', trimmed);
                          setNewCategoryInput('');
                          setIsAddingCategory(false);
                          toast.success(`Category "${trimmed}" added!`);
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const trimmed = newCategoryInput.trim().toUpperCase();
                      if (trimmed) {
                        if (!categoriesList.includes(trimmed)) {
                          setCategoriesList((prev) => [...prev, trimmed].sort());
                        }
                        setValue('category', trimmed);
                        setNewCategoryInput('');
                        setIsAddingCategory(false);
                        toast.success(`Category "${trimmed}" added!`);
                      }
                    }}
                    className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors"
                    title="Add Category"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <select
                  {...register('category')}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Publication Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Estimated Read Time */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Estimated Reading Time</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  {...register('readTime')}
                  placeholder="e.g. 12 min read"
                  className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Author Details */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-teal-400" />
              Author Metadata
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Author Name</label>
              <input
                type="text"
                {...register('authorName')}
                placeholder="ADMIN"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Author Role</label>
              <input
                type="text"
                {...register('authorRole')}
                placeholder="Design Director"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Author Avatar Image</label>
              <ImageUploader
                bucket="avatars"
                multiple={false}
                value={watch('authorAvatar')}
                onChange={(url) => setValue('authorAvatar', url)}
              />
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Featured Hero Cover Image
            </h3>
            <ImageUploader
              bucket="blog"
              multiple={false}
              value={watch('image')}
              onChange={(url) => setValue('image', url)}
            />
          </div>

          {/* SEO Metadata */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              SEO Settings
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Meta Title</label>
              <input
                type="text"
                {...register('meta_title')}
                placeholder="Search engine title snippet"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Meta Description</label>
              <textarea
                {...register('meta_description')}
                rows={3}
                placeholder="Search engine summary snippet..."
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Discard Confirmation Modal */}
      <ConfirmModal
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        onConfirm={() => {
          setShowDiscardModal(false);
          router.push('/dashboard/blog');
        }}
        title="Discard Unsaved Article?"
        description="Are you sure you want to exit without saving? Any unsaved article changes will be lost."
        confirmText="Discard Article"
        variant="warning"
      />
    </form>
  );
}
