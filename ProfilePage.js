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
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      const { data: user, error } = await supabase.auth.getUser();
      if (error || !user?.user) {
        Alert.alert('Error', 'User not authenticated');
        setLoading(false);
        return;
      }

      setUserId(user.user.id);

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.user.id)
        .single();

      if (profileError) {
        Alert.alert('Error', 'Failed to fetch user profile');
      } else {
        setUsername(profile?.username || 'Unknown User');
        setAvatarUrl(profile?.avatar_url || null);
      }

      // Fetch user's favorite artists
      const { data: favArtists, error: favError } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.user.id);

      if (favError) {
        Alert.alert('Error', favError.message);
      } else {
        setArtists(favArtists || []);
      }

      // Fetch user orders
      const { data: userOrders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false });

      if (orderError) {
        Alert.alert('Error fetching orders', orderError.message);
      } else {
        setOrders(userOrders || []);
      }

      setLoading(false);
    }

    fetchUserData();
  }, []);

  const handleFavoritePress = async (artistName) => {
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
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.orderImage} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.orderText}>{item.name}</Text>
        <Text style={styles.orderSubText}>Price: ₹{item.price}</Text>
        <Text style={styles.orderSubText}>Qty: {item.quantity}</Text>
        <Text style={styles.orderSubText}>
          Ordered on: {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePhoto}
          source={avatarUrl ? { uri: avatarUrl } : require('./assets/default.jpeg')}
        />
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* Favorite Artists */}
      <Text style={styles.header}>Favorite Artists</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#c4d9ff" style={styles.loadingIndicator} />
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

      {/* Add Artist */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an artist"
          placeholderTextColor="#888"
          value={newArtist}
          onChangeText={setNewArtist}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleFavoritePress(newArtist)}>
          <Text style={styles.buttonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

     {/* Orders Section */}
<Text style={styles.header}>Your Orders</Text>
{loading ? (
  <ActivityIndicator size="large" color="#c4d9ff" style={styles.loadingIndicator} />
) : orders.length === 0 ? (
  <Text style={styles.emptyText}>No orders yet.</Text>
) : (
  <>
  {/* Pending Orders */}
<Text style={styles.subHeader}>Pending Orders</Text>
{orders.filter(order => order.status?.toLowerCase() === 'pending').length === 0 ? (
  <Text style={styles.emptyText}>No pending orders.</Text>
) : (
  <FlatList
    data={orders.filter(order => order.status?.toLowerCase() === 'pending')}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={[styles.orderCard, { borderLeftColor: '#FFA500', borderLeftWidth: 5 }]}>
        {item.image_url && (
          <Image source={{ uri: item.image_url }} style={styles.orderImage} />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.orderText}>{item.name}</Text>
          <Text style={styles.orderSubText}>Price: ₹{item.price}</Text>
          <Text style={styles.orderSubText}>Qty: {item.quantity}</Text>
          <Text style={[styles.orderSubText, { color: '#FFA500' }]}>⏳ Pending</Text>
          <Text style={styles.orderSubText}>
            Ordered on: {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
    )}
    style={{ marginBottom: 20 }}
  />
)}


    {/* Completed Orders */}
    <Text style={styles.subHeader}>Completed Orders</Text>
    {orders.filter(order => order.status !== 'pending').length === 0 ? (
      <Text style={styles.emptyText}>No completed orders.</Text>
    ) : (
      <FlatList
        data={orders.filter(order => order.status !== 'pending')}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        style={{ marginBottom: 20 }}
      />
    )}
  </>
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
    marginTop: 20,
    marginBottom: 10,
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
    marginTop: 10,
  },
  orderCard: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    alignItems: 'center',
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  orderText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderSubText: {
    color: '#cccccc',
    fontSize: 14,
  },
});
