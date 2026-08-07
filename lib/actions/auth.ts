'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logActivity } from './activity';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  await logActivity({
    action: 'LOGIN',
    entityType: 'auth',
    details: { email },
  });

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await logActivity({
      action: 'LOGOUT',
      entityType: 'auth',
      details: { email: user.email },
    });
  }

  await supabase.auth.signOut();
  redirect('/login');
}
