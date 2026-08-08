'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { logActivity } from './activity';
import { ContactMessageFormValues } from '../validations/message';

export async function submitContactMessage(values: ContactMessageFormValues) {
  try {
    const supabase = await createClient();

    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      subject: values.subject || 'General Inquiry',
      message: values.message,
      status: 'unread',
    };

    const { data, error } = await supabase.from('messages').insert([payload]).select().single();

    if (error) {
      console.error('Failed to submit message to Supabase:', error);
      return { error: 'Failed to submit message. Please try again.' };
    }

    await logActivity({
      action: 'CONTACT_SUBMITTED',
      entityType: 'message',
      entityId: data.id,
      details: { email: values.email, subject: values.subject },
    });

    revalidatePath('/dashboard/messages');
    return { success: true, data };
  } catch (err: any) {
    console.error('Contact submission error:', err);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function getMessages(options?: { status?: string }) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('messages')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (options?.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    const { data, error } = await query;

    if (error || !data) {
      return [];
    }

    return data;
  } catch (err) {
    console.error('Error fetching messages:', err);
    return [];
  }
}

export async function updateMessageStatus(id: string, status: 'unread' | 'read' | 'archived') {
  const supabase = await createClient();

  const { error } = await supabase
    .from('messages')
    .update({ status })
    .eq('id', id);

  if (error) return { error: error.message };

  await logActivity({
    action: `MESSAGE_${status.toUpperCase()}`,
    entityType: 'message',
    entityId: id,
  });

  revalidatePath('/dashboard/messages');
  return { success: true };
}

export async function deleteMessage(id: string, permanent = false) {
  const supabase = await createClient();

  if (permanent) {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from('messages')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (error) return { error: error.message };
  }

  await logActivity({
    action: permanent ? 'MESSAGE_PERMANENT_DELETED' : 'MESSAGE_DELETED',
    entityType: 'message',
    entityId: id,
  });

  revalidatePath('/dashboard/messages');
  return { success: true };
}

export async function bulkUpdateMessages(ids: string[], action: 'read' | 'unread' | 'archive' | 'delete') {
  const supabase = await createClient();

  if (action === 'delete') {
    const { error } = await supabase.from('messages').delete().in('id', ids);
    if (error) return { error: error.message };
  } else {
    const targetStatus = action === 'archive' ? 'archived' : action;
    const { error } = await supabase
      .from('messages')
      .update({ status: targetStatus })
      .in('id', ids);
    if (error) return { error: error.message };
  }

  await logActivity({
    action: `MESSAGES_BULK_${action.toUpperCase()}`,
    entityType: 'message',
    details: { count: ids.length },
  });

  revalidatePath('/dashboard/messages');
  return { success: true };
}
