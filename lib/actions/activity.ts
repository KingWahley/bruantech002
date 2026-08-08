import { createClient } from '@/lib/supabase/server';

const MOCK_ACTIVITIES = [
  {
    id: 'mock-1',
    user_email: 'admin@bruantech.com',
    action: 'SYSTEM_INITIALIZED',
    entity_type: 'system',
    details: { note: 'Admin dashboard initialized' },
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    user_email: 'admin@bruantech.com',
    action: 'LOGIN',
    entity_type: 'auth',
    details: { email: 'admin@bruantech.com' },
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

export async function logActivity({
  action,
  entityType,
  entityId,
  details = {},
}: {
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, any>;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('activity_logs').insert([
      {
        user_id: user?.id || null,
        user_email: user?.email || 'System/Public',
        action,
        entity_type: entityType,
        entity_id: entityId || null,
        details,
      },
    ]);
  } catch (error: any) {
    // Silent fail if table not migrated yet
  }
}

export async function getActivityLogs(limit = 20) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data || data.length === 0) {
      return MOCK_ACTIVITIES;
    }

    return data;
  } catch (error: any) {
    return MOCK_ACTIVITIES;
  }
}
