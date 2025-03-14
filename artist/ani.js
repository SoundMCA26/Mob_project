import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { getFavoriteArtists, addFavoriteArtist, removeFavoriteArtist } from '../auth/UserProfile';

export default function ProfileScreen() {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState('');

  useEffect(() => {
    async function fetchArtists() {
      const favorites = await getFavoriteArtists();
      setArtists(favorites);
    }
    fetchArtists();
  }, []);

  async function handleFavoritePress(artistName) {
    if (artists.some((a) => a.artist_name === artistName)) {
      await removeFavoriteArtist(artistName);
    } else {
      await addFavoriteArtist(artistName);
    }
    setArtists(await getFavoriteArtists()); // Refresh list
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎵 Favorite Artists</Text>

      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.artistCard} onPress={() => handleFavoritePress(item.artist_name)}>
            <Text style={styles.artistText}>{item.artist_name} ❤️</Text>
          </TouchableOpacity>
        )}
      />

      {/* Add Artist Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an artist"
          value={newArtist}
          onChangeText={setNewArtist}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleFavoritePress(newArtist)}>
          <Text style={styles.buttonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  artistCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  artistText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
