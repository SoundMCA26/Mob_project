import { supabase } from './supabaseClient';

// Fetch all merchandise by artist
export const fetchMerchandise = async (artistId) => {
  const { data, error } = await supabase
    .from('Merchandise')
    .select('*')
    .eq('artist_id', artistId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Upload a merchandise item with image
export const uploadMerchandise = async ({ name, price, description, imageUri, stock, artistId }) => {
  const fileName = `${Date.now()}-${name.replace(/\s+/g, '_')}.jpg`;

  const response = await fetch(imageUri);
  const blob = await response.blob();

  const { data: imageData, error: imageError } = await supabase
    .storage
    .from('merch-images')
    .upload(fileName, blob);

  if (imageError) throw imageError;

  const imageUrl = supabase.storage
    .from('merch-images')
    .getPublicUrl(imageData.path).data.publicUrl;

  const { data, error } = await supabase.from('Merchandise').insert([{
    name,
    price,
    description,
    image_url: imageUrl,
    stock,
    artist_id: artistId,
  }]);

  if (error) throw error;
  return data;
};
