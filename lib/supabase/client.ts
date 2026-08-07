import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hlmsrwnyhzqoalsosjwf.supabase.co';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'sb_publishable_r2fE_W_7P08IwmDsoR270g_-JXbMLr8';

  return createBrowserClient(supabaseUrl, supabaseKey);
}
