
import { createClient } from '@supabase/supabase-js';

// These values are safe to expose in the client-side code (public anon key)
const supabaseUrl = 'https://edftbrcnkkezyswozixw.supabase.co';
// Replace this with your actual public anon key from Supabase dashboard
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZnRicmNua2tlenlzd296aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1NDUwNTksImV4cCI6MjAxNDEyMTA1OX0.c7fijHy8qWkJSPUZ0jzT7qQJbf-fDTrhz-kHuF_W_qo';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
