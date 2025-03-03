
import { createClient } from '@supabase/supabase-js';

// These values are safe to expose in the client-side code (public anon key)
const supabaseUrl = 'https://edftbrcnkkezyswozixw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZnRicmNua2tlenlzd296aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTM2ODYsImV4cCI6MjA1NjU4OTY4Nn0.sJFh8DKc7Dv_7_tGKiAl6XiAsXwI4AMnqXqJ-eZhXp4';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
