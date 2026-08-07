import { createClient } from '@/lib/supabase/server';

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
  } catch (error) {
    console.error('Failed to log activity:', error);
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

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return [];
  }
}
