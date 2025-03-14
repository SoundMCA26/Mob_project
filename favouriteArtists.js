import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { supabase } from './supabaseclient';

export default function FavoriteArtists() {
  const [artist, setArtist] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  // 🎵 Fetch favorite artists from Supabase
  async function fetchFavorites() {
    try {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        Alert.alert('Error', 'User not found. Please log in.');
        return;
      }

      const { data: favoritesData, error: fetchError } = await supabase
        .from('user_favorites')
        .select('artist_name')
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;

      setFavorites(favoritesData);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Fetch favorites failed:', error);
    }
  }

  // 🌟 Fetch artist suggestions from Supabase
  async function fetchArtistSuggestions(query) {
    try {
      if (!query) {
        setSuggestions([]);
        return;
      }

      const { data, error } = await supabase
        .from('artists')
        .select('name')
        .ilike('name', `%${query}%`);

      if (error) throw error;

      setSuggestions(data);
    } catch (error) {
      console.error('Fetch suggestions failed:', error);
    }
  }

  // 🎤 Add a new favorite artist
  async function addFavorite(artistName) {
    if (!artistName) {
      Alert.alert('Error', 'Please enter an artist name');
      return;
    }

    try {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        Alert.alert('Error', 'User not found. Please log in.');
        return;
      }

      const { error: insertError } = await supabase
        .from('user_favorites')
        .insert([{ user_id: user.id, artist_name: artistName }]);

      if (insertError) throw insertError;

      setArtist('');
      setSuggestions([]);
      fetchFavorites();
      Alert.alert('Success', 'Artist added to favorites!');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Add favorite failed:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎵 Favorite Artists</Text>

      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>No favorite artists yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.artist_name}
          renderItem={({ item }) => (
            <Text style={styles.artistItem}>{item.artist_name}</Text>
          )}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an artist"
          value={artist}
          onChangeText={(text) => {
            setArtist(text);
            fetchArtistSuggestions(text);
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addFavorite(artist)}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.name}
          style={styles.suggestionsContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => addFavorite(item.name)}>
              <Text style={styles.suggestionItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noFavorites: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  artistItem: {
    fontSize: 20,
    color: '#333',
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  suggestionItem: {
    padding: 10,
    fontSize: 18,
    color: '#555',
  },
});
