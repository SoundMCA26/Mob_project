import { supabase } from '../supabaseclient';

// ✅ Get favorite artists
export async function getFavoriteArtists() {
  const { data, error } = await supabase
    .from('favorite_artists')
    .select('*')
    .eq('user_id', (await supabase.auth.getUser()).data.user.id);

  if (error) console.error('Error fetching favorites:', error);
  return data;
}

// ✅ Add a favorite artist
export async function addFavoriteArtist(artistName) {
  const { data, error } = await supabase
    .from('favorite_artists')
    .insert([{ user_id: (await supabase.auth.getUser()).data.user.id, artist_name: artistName }]);

  if (error) console.error('Error adding favorite:', error);
  return data;
}

// ✅ Remove a favorite artist
export async function removeFavoriteArtist(artistName) {
  const { data, error } = await supabase
    .from('favorite_artists')
    .delete()
    .eq('user_id', (await supabase.auth.getUser()).data.user.id)
    .eq('artist_name', artistName);

  if (error) console.error('Error removing favorite:', error);
  return data;
}
