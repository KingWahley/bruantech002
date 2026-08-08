'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormValues } from '@/lib/validations/project';
import ImageUploader from '@/components/dashboard/upload/ImageUploader';
import ConfirmModal from '@/components/dashboard/ui/ConfirmModal';
import { createProject, updateProject, getProjectCategories } from '@/lib/actions/projects';
import { slugify } from '@/lib/utils';
import { ArrowLeft, Save, Trash2, Plus, X, Globe, Layers, Cpu, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ProjectFormProps {
  initialData?: any;
  isEditing?: boolean;
}


const DEFAULT_TECH = [
  'JavaScript',
  'TypeScript',
  'Python',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Supabase',
  'Node.js',
  'Java',
  'Django',
  'Google Cloud',
  'Kubernetes',
];

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [deliverableInput, setDeliverableInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<string[]>(['Web Design', 'App Design', 'E-Commerce', 'Cloud Engineering']);
  const [categoryInput, setCategoryInput] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const defaultValues: ProjectFormValues = {
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.categories?.[0] || initialData?.category || 'Web Design',
    categories: (
      Array.isArray(initialData?.categories) && initialData.categories.length > 0
        ? initialData.categories
        : initialData?.category ? [initialData.category] : ['Web Design']
    ),
    client: initialData?.client || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    deliverables: initialData?.deliverables || [],
    process: initialData?.process || [],
    image: initialData?.image || '',
    gallery: initialData?.gallery || [],
    techStack: initialData?.tech_stack || initialData?.techStack || [],
    featured: initialData?.featured || false,
    status: initialData?.status || 'published',
    meta_title: initialData?.meta_title || initialData?.title || '',
    meta_description: initialData?.meta_description || initialData?.description || '',
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = form;

  React.useEffect(() => {
    getProjectCategories().then(setCategoryOptions);
  }, []);

  const currentTitle = watch('title');
  const currentSlug = watch('slug');
  const currentCategories = watch('categories') || [];
  const currentDeliverables = watch('deliverables') || [];
  const currentTechStack = watch('techStack') || [];
  const currentProcess = watch('process') || [];

  const handleAddCategory = (cat: string) => {
    const trimmed = cat.trim();
    if (!trimmed) return;
    if (currentCategories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      toast.error(`"${trimmed}" is already added.`);
      return;
    }
    const next = [...currentCategories, trimmed];
    setValue('categories', next);
    setValue('category', next[0]);
    // Persist new custom options locally
    if (!categoryOptions.some((o) => o.toLowerCase() === trimmed.toLowerCase())) {
      setCategoryOptions((prev) => Array.from(new Set([...prev, trimmed])).sort());
    }
    setCategoryInput('');
  };

  const handleRemoveCategory = (cat: string) => {
    const next = currentCategories.filter((c) => c !== cat);
    setValue('categories', next);
    setValue('category', next[0] || '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('title', val);
    if (!isEditing || !currentSlug) {
      setValue('slug', slugify(val));
    }
  };

  const handleAddDeliverable = () => {
    const trimmed = deliverableInput.trim();
    if (!trimmed) return;
    if (currentDeliverables.some((d) => d.toLowerCase() === trimmed.toLowerCase())) {
      toast.error(`"${trimmed}" is already in the deliverables list.`);
      return;
    }
    setValue('deliverables', [...currentDeliverables, trimmed]);
    setDeliverableInput('');
  };

  const handleRemoveDeliverable = (idx: number) => {
    setValue('deliverables', currentDeliverables.filter((_, i) => i !== idx));
  };

  const handleToggleTech = (techName: string) => {
    const exists = currentTechStack.some((t) => t.name === techName);
    if (exists) {
      setValue('techStack', currentTechStack.filter((t) => t.name !== techName));
    } else {
      setValue('techStack', [...currentTechStack, { name: techName, icon: '' }]);
    }
  };

  const handleAddCustomTech = () => {
    const trimmed = techInput.trim();
    if (!trimmed) return;
    if (currentTechStack.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error(`"${trimmed}" is already in the tech stack.`);
      return;
    }
    setValue('techStack', [...currentTechStack, { name: trimmed, icon: '' }]);
    setTechInput('');
  };

  const handleAddProcessParagraph = () => {
    setValue('process', [...currentProcess, '']);
  };

  const handleProcessChange = (index: number, val: string) => {
    const updated = [...currentProcess];
    updated[index] = val;
    setValue('process', updated);
  };

  const handleRemoveProcess = (index: number) => {
    setValue('process', currentProcess.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setSubmitting(true);
    let result;

    if (isEditing && initialData?.id && !initialData.id.startsWith('mock-')) {
      result = await updateProject(initialData.id, values);
    } else {
      result = await createProject(values);
    }

    setSubmitting(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(isEditing ? 'Project saved successfully' : 'Project created successfully');
      router.push('/dashboard/projects');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/projects"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-mono text-zinc-100">
              {isEditing ? `Edit Project: ${initialData?.title}` : 'Create New Project'}
            </h1>
            <p className="text-xs text-zinc-400">
              Form fields directly mirror the public case study page layout
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
            className="flex items-center gap-2 px-5 py-2 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-teal-500/10 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {submitting ? 'Saving...' : isEditing ? 'Update Project' : 'Save Project'}
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Core Fields */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card: Basic Project Information */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-400" />
              General Project Details
            </h2>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Project Title *</label>
              <input
                type="text"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="e.g. Never Go Alone"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-teal-500 transition-colors"
              />
              {errors.title && <span className="text-xs text-rose-400">{errors.title.message}</span>}
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">URL Slug *</label>
              <input
                type="text"
                {...register('slug')}
                placeholder="never-go-alone"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 font-mono focus:outline-none focus:border-teal-500 transition-colors"
              />
              {errors.slug && <span className="text-xs text-rose-400">{errors.slug.message}</span>}
            </div>

            {/* Client & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-300">Client Name</label>
                <input
                  type="text"
                  {...register('client')}
                  placeholder="e.g. Deola Sagoe"
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-300">Location</label>
                <input
                  type="text"
                  {...register('location')}
                  placeholder="e.g. Nigeria"
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Short Summary / Description</label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Brief summary displayed on project cards..."
                className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Card: Deliverables & The Process */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              Deliverables & The Process
            </h2>

            {/* Deliverables tags */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300">Project Deliverables</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={deliverableInput}
                  onChange={(e) => setDeliverableInput(e.target.value)}
                  placeholder="Add item (e.g. Web Design)"
                  className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {currentDeliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-lg text-xs font-medium"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(idx)}
                      className="hover:text-teal-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Process Paragraphs */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-300">
                  "The Process" Content Paragraphs
                </label>
                <button
                  type="button"
                  onClick={handleAddProcessParagraph}
                  className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Paragraph
                </button>
              </div>

              {currentProcess.map((pText, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <textarea
                    rows={3}
                    value={pText}
                    onChange={(e) => handleProcessChange(idx, e.target.value)}
                    placeholder={`Process paragraph #${idx + 1}...`}
                    className="flex-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProcess(idx)}
                    className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Tech Stack Selection */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Technologies Used
            </h2>

            {/* Custom tech input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300">Add Custom Technology</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomTech(); } }}
                  placeholder="e.g. Prisma, Figma, AWS Lambda…"
                  className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTech}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>

            {/* Preset toggles */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300">Quick-select</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {DEFAULT_TECH.map((techName) => {
                  const isSelected = currentTechStack.some((t) => t.name === techName);
                  return (
                    <button
                      key={techName}
                      type="button"
                      onClick={() => handleToggleTech(techName)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                        isSelected
                          ? 'bg-teal-500/10 border-teal-500/30 text-teal-400 font-semibold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {techName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom (non-preset) tech pills */}
            {currentTechStack.filter((t) => !DEFAULT_TECH.includes(t.name)).length > 0 && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300">Custom Additions</label>
                <div className="flex flex-wrap gap-2">
                  {currentTechStack
                    .filter((t) => !DEFAULT_TECH.includes(t.name))
                    .map((t) => (
                      <span
                        key={t.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-xs font-medium"
                      >
                        {t.name}
                        <button
                          type="button"
                          onClick={() => handleToggleTech(t.name)}
                          className="hover:text-cyan-200"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Card: Image Gallery */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              Project Gallery Images
            </h2>
            <ImageUploader
              bucket="projects"
              multiple={true}
              value={watch('gallery')}
              onChange={(urls) => setValue('gallery', urls)}
            />
          </div>

        </div>

        {/* Right Column: Settings, Images & Meta */}
        <div className="flex flex-col gap-6">
          
          {/* Status & Category */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Publishing Options
            </h3>

            {/* Categories – multi-tag */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300">Categories</label>

              {/* Selected tags */}
              {currentCategories.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {currentCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-lg text-xs font-medium"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(cat)}
                        className="hover:text-teal-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Combobox input */}
              <div className="relative">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => {
                    setCategoryInput(e.target.value);
                    setShowCategoryDropdown(true);
                  }}
                  onFocus={() => setShowCategoryDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCategoryDropdown(false), 150)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCategory(categoryInput); } }}
                  placeholder="Add a category…"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
                />
                {showCategoryDropdown && (
                  <ul className="absolute z-20 top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-xl max-h-48 overflow-y-auto">
                    {categoryOptions
                      .filter((opt) =>
                        !currentCategories.includes(opt) &&
                        (!categoryInput.trim() || opt.toLowerCase().includes(categoryInput.toLowerCase()))
                      )
                      .map((opt) => (
                        <li
                          key={opt}
                          onMouseDown={() => handleAddCategory(opt)}
                          className="px-3 py-2 text-xs cursor-pointer text-zinc-300 hover:bg-zinc-800 transition-colors"
                        >
                          {opt}
                        </li>
                      ))}
                    {categoryInput.trim() &&
                      !categoryOptions.some(
                        (o) => o.toLowerCase() === categoryInput.trim().toLowerCase()
                      ) && (
                        <li
                          onMouseDown={() => handleAddCategory(categoryInput)}
                          className="px-3 py-2 text-xs cursor-pointer text-teal-400 hover:bg-zinc-800 border-t border-zinc-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Create &ldquo;{categoryInput.trim()}&rdquo;
                        </li>
                      )}
                  </ul>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-xs font-semibold text-zinc-300">Featured Project</span>
              <input
                type="checkbox"
                {...register('featured')}
                className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Main Featured Cover Image
            </h3>
            <ImageUploader
              bucket="projects"
              multiple={false}
              value={watch('image')}
              onChange={(url) => setValue('image', url)}
            />
          </div>

          {/* SEO Metadata */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              SEO Optimization
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Meta Title</label>
              <input
                type="text"
                {...register('meta_title')}
                placeholder="Page title for search engines"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Meta Description</label>
              <textarea
                {...register('meta_description')}
                rows={3}
                placeholder="Meta snippet for search engines..."
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500 resize-none"
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
          router.push('/dashboard/projects');
        }}
        title="Discard Unsaved Changes?"
        description="Are you sure you want to leave this page? Any unsaved project changes will be lost."
        confirmText="Discard Changes"
        variant="warning"
      />
    </form>
  );
}
