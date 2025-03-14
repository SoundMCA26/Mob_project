import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { supabase } from './supabaseclient';

const ProfileScreen = () => {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function fetchUserAndArtists() {
      const { data: user, error } = await supabase.auth.getUser();
      if (error || !user?.user) {
        Alert.alert('Error', 'User not authenticated');
        setLoading(false);
        return;
      }

      setUserId(user.user.id);

      // Fetch username and avatar URL from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.user.id)
        .single();

      if (profileError) {
        Alert.alert('Error', 'Failed to fetch user profile');
        setUsername('Unknown User');
      } else {
        setUsername(profile?.username || 'Unknown User');
        setAvatarUrl(profile?.avatar_url || null);
      }

      // Fetch user's favorite artists
      const { data, error: fetchError } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.user.id);

      if (fetchError) {
        Alert.alert('Error', fetchError.message);
      } else {
        setArtists(data || []);
      }

      setLoading(false);
    }

    fetchUserAndArtists();
  }, []);

  // 🎵 Add or Remove Favorite Artist
  async function handleFavoritePress(artistName) {
    if (!artistName.trim()) {
      Alert.alert('Error', 'Artist name cannot be empty');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const existingArtist = artists.find(
      (a) => a.artist_name.toLowerCase() === artistName.toLowerCase()
    );

    if (existingArtist) {
      // 🚫 Remove artist from favorites
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('id', existingArtist.id)
        .eq('user_id', userId);

      if (error) {
        Alert.alert('Error', 'Failed to remove artist');
      } else {
        setArtists((prev) => prev.filter((a) => a.id !== existingArtist.id));
        Alert.alert('Removed', `${artistName} removed from favorites.`);
      }
    } else {
      // ➕ Add new favorite artist
      const { data, error } = await supabase
        .from('user_favorites')
        .insert([{ user_id: userId, artist_name: artistName }])
        .select();

      if (error) {
        Alert.alert('Error', 'Failed to add artist');
      } else {
        setArtists([...artists, ...data]);
        Alert.alert('Success', `${artistName} added to favorites!`);
      }
    }

    setNewArtist('');
    setSuggestions([]);
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePhoto}
          source={
            avatarUrl
              ? { uri: avatarUrl }
              : require('./assets/default.jpeg')
          }
        />
        <Text style={styles.username}>{username}</Text>
      </View>

      <Text style={styles.header}>Favorite Artists</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#c4d9ff"
          style={styles.loadingIndicator}
        />
      ) : artists.length === 0 ? (
        <Text style={styles.emptyText}>No favorite artists yet.</Text>
      ) : (
        <FlatList
          data={artists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.artistCard}
              onPress={() => handleFavoritePress(item.artist_name)}
            >
              <Text style={styles.artistText}>{item.artist_name} ❤️</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Add Artist Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an artist"
          placeholderTextColor="#888"
          value={newArtist}
          onChangeText={setNewArtist}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleFavoritePress(newArtist)}
        >
          <Text style={styles.buttonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleFavoritePress(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 10,
  },
  artistCard: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  artistText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  emptyText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  suggestionItem: {
    backgroundColor: '#2E2E2E',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  suggestionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
