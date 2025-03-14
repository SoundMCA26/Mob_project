import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bmktywxfunkihhqzazvy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJta3R5d3hmdW5raWhocXphenZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDU1NTEsImV4cCI6MjA1NTc4MTU1MX0.I_FsQQPOvxbvjmgqNgrSG2Eh75TdLe_Hp0cAbwduxJU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
