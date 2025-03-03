
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edftbrcnkkezyswozixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZnRicmNua2tlenlzd296aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTM2ODYsImV4cCI6MjA1NjU4OTY4Nn0.sJFh8DKc7Dv_7_tGKiAl6XiAsXwI4AMnqXqJ-eZhXp4';

export const supabase = createClient(supabaseUrl, supabaseKey);
