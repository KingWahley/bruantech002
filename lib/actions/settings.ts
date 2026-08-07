'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { logActivity } from './activity';
import { SiteSettingsFormValues } from '../validations/settings';

const DEFAULT_SETTINGS: SiteSettingsFormValues = {
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
};

export async function getSiteSettings(): Promise<SiteSettingsFormValues> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'site_general')
      .single();

    if (error || !data || !data.value) {
      return DEFAULT_SETTINGS;
    }

    return { ...DEFAULT_SETTINGS, ...data.value };
  } catch (err) {
    console.error('Error fetching site settings:', err);
    return DEFAULT_SETTINGS;
  }
}

export async function updateSiteSettings(values: SiteSettingsFormValues) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('settings')
    .upsert(
      {
        key: 'site_general',
        value: values,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    )
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  await logActivity({
    action: 'SETTINGS_UPDATED',
    entityType: 'settings',
    details: { keysUpdated: Object.keys(values) },
  });

  revalidatePath('/dashboard/settings');
  revalidatePath('/', 'layout');
  return { success: true, data: values };
}
