import { NextResponse } from 'next/server';
import { createPublicClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 1. Verify cron authorization secret
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = request.headers.get('authorization');

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Obtain Supabase client
    let supabase;
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      supabase = createAdminClient();
    } else {
      supabase = createPublicClient();
    }

    // 3. Perform a lightweight, read-only database query
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    if (error) {
      console.error('[KEEP_ALIVE] Supabase request failed:', error.message);
      return NextResponse.json(
        { success: false, error: 'Database request failed' },
        { status: 500 }
      );
    }

    console.log(`[KEEP_ALIVE] Supabase request successful (${data?.length ?? 0} record found)`);
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[KEEP_ALIVE] Internal server error:', message);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
