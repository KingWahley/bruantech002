'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siteSettingsSchema, SiteSettingsFormValues } from '@/lib/validations/settings';
import { getSiteSettings, updateSiteSettings } from '@/lib/actions/settings';
import { Save, Globe, Mail, Phone, MapPin, Share2, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteTitle: 'Bruantech - Technology & Digital Agency',
      siteDescription: 'Transforming ideas into high-performing digital experiences.',
      contactEmail: 'Brume@gmail.com',
      phoneNumber: '+123456780',
      address: '132 address lagos Nigeria',
      twitterUrl: '#',
      instagramUrl: '#',
      discordUrl: '#',
      linkedinUrl: '#',
      footerText: '© 2026 BruanTech. All rights reserved.',
      googleAnalyticsId: '',
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = form;

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      const data = await getSiteSettings();
      reset(data);
      setLoading(false);
    }
    loadSettings();
  }, [reset]);

  const onSubmit = async (values: SiteSettingsFormValues) => {
    setSaving(true);
    const res = await updateSiteSettings(values);
    setSaving(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Website settings saved successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-zinc-100 tracking-tight">Website Settings</h1>
          <p className="text-xs text-zinc-400 mt-1">Configure site-wide metadata, contact details, and social channels</p>
        </div>

        <button
          type="submit"
          disabled={saving || loading}
          className="flex items-center gap-2 px-5 py-2 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-teal-500/10 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: General Branding & Contact Details */}
        <div className="flex flex-col gap-6">
          
          {/* General Information */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-400" />
              General Branding & SEO
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Site Title *</label>
              <input
                type="text"
                {...register('siteTitle')}
                placeholder="Bruantech - Technology Agency"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-teal-500"
              />
              {errors.siteTitle && <span className="text-xs text-rose-400">{errors.siteTitle.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Site Tagline / Description</label>
              <textarea
                {...register('siteDescription')}
                rows={3}
                placeholder="Brief site description..."
                className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Footer Copyright Text</label>
              <input
                type="text"
                {...register('footerText')}
                placeholder="© 2026 BruanTech. All rights reserved."
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              Public Contact Information
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Contact Email *</label>
              <input
                type="email"
                {...register('contactEmail')}
                placeholder="Brume@gmail.com"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
              {errors.contactEmail && <span className="text-xs text-rose-400">{errors.contactEmail.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Phone Number</label>
              <input
                type="text"
                {...register('phoneNumber')}
                placeholder="+123456780"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Office Physical Address</label>
              <input
                type="text"
                {...register('address')}
                placeholder="132 address lagos Nigeria"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Social Links & Integrations */}
        <div className="flex flex-col gap-6">
          
          {/* Social Channels */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <Share2 className="w-4 h-4 text-purple-400" />
              Social Media Channels
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">X (Twitter) URL</label>
              <input
                type="text"
                {...register('twitterUrl')}
                placeholder="https://x.com/bruantech"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Instagram URL</label>
              <input
                type="text"
                {...register('instagramUrl')}
                placeholder="https://instagram.com/bruantech"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Discord URL</label>
              <input
                type="text"
                {...register('discordUrl')}
                placeholder="https://discord.gg/bruantech"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">LinkedIn URL</label>
              <input
                type="text"
                {...register('linkedinUrl')}
                placeholder="https://linkedin.com/company/bruantech"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Analytics Integrations */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              Analytics & Tracking
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Google Analytics Tracking ID</label>
              <input
                type="text"
                {...register('googleAnalyticsId')}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 font-mono focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

        </div>

      </div>
    </form>
  );
}
