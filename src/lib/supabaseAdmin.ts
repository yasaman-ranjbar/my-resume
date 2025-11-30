import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a dummy client or null if env vars are missing to prevent build failure
// This is important because this file is imported by API routes which are processed during build
export const supabaseAdmin = (url && serviceRoleKey) 
  ? createClient(url, serviceRoleKey, {
      auth: {
        persistSession: false,
      },
    })
  : createClient('https://placeholder.supabase.co', 'placeholder', {
      auth: {
        persistSession: false,
      },
    });

if (!url || !serviceRoleKey) {
  console.warn('Missing SUPABASE env variables. Supabase admin client will not work.');
}
