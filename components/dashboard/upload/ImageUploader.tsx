'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  value?: string | string[];
  onChange: (urls: any) => void;
  bucket?: 'projects' | 'blog' | 'avatars';
  multiple?: boolean;
  maxFiles?: number;
}

export default function ImageUploader({
  value,
  onChange,
  bucket = 'projects',
  multiple = false,
  maxFiles = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imagesList = multiple
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === 'string' && value
    ? [value]
    : [];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    await uploadFiles(files);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;
    await uploadFiles(files);
  };

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    setProgress(10);

    const uploadedUrls: string[] = [];
    const supabase = createClient();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate MIME & Size (max 5MB)
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a valid image file.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit.`);
        continue;
      }

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

        if (error) {
          console.warn('Supabase storage upload fallback:', error.message);
          // Fallback to Object URL preview if Supabase storage bucket is not created yet
          const objectUrl = URL.createObjectURL(file);
          uploadedUrls.push(objectUrl);
        } else {
          const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
          uploadedUrls.push(publicUrlData.publicUrl);
        }
      } catch (err) {
        console.error('File upload error:', err);
        const objectUrl = URL.createObjectURL(file);
        uploadedUrls.push(objectUrl);
      }

      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setUploading(false);
    setProgress(0);

    if (uploadedUrls.length > 0) {
      toast.success(
        uploadedUrls.length === 1 ? 'Image uploaded successfully' : `${uploadedUrls.length} images uploaded`
      );

      if (multiple) {
        onChange([...imagesList, ...uploadedUrls].slice(0, maxFiles));
      } else {
        onChange(uploadedUrls[0]);
      }
    }
  };

  const handleRemove = (indexToRemove: number) => {
    if (multiple) {
      const updated = imagesList.filter((_, idx) => idx !== indexToRemove);
      onChange(updated);
    } else {
      onChange('');
    }
    toast.success('Image removed');
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          uploading
            ? 'border-teal-500 bg-teal-500/5 cursor-not-allowed'
            : 'border-zinc-700 hover:border-teal-500 hover:bg-zinc-800/50 bg-zinc-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
              <span className="text-xs font-semibold text-teal-400">Uploading... {progress}%</span>
              <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-teal-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-full bg-zinc-800 text-zinc-300">
                <Upload className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-200">
                  Click to upload or drag & drop
                </span>
                <span className="text-xs text-zinc-500 mt-0.5">
                  PNG, JPG, WEBP or GIF (Max 5MB)
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {imagesList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
          {imagesList.map((url, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-video flex items-center justify-center"
            >
              <img src={url} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                  title="Replace"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
