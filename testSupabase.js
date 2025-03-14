import { supabase } from './supabaseclient';

async function testConnection() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);

  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase is connected! Sample data:', data);
  }
}

testConnection();
