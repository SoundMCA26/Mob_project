import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchMerchandise } from '../lib/merchService';

const MerchSection = ({ artistId }) => {
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const items = await fetchMerchandise(artistId);
        setMerch(items);
      } catch (e) {
        console.error('Failed to load merch:', e);
      } finally {
        setLoading(false);
      }
    };
    if (artistId) load();
  }, [artistId]);

  if (loading) {
    return <ActivityIndicator style={{ margin: 20 }} />;
  }

  if (!merch.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Merchandise</Text>
      <FlatList
        data={merch}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text numberOfLines={2}>{item.description}</Text>
            <Text style={styles.stock}>Stock: {item.stock}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginVertical: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginLeft: 10 },
  card: {
    margin: 10,
    padding: 10,
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: { width: '100%', height: 120, borderRadius: 8, marginBottom: 6 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'green' },
  stock: { fontSize: 12, color: 'gray' },
});

export default MerchSection;
