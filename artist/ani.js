import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Anirudh = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Anirudh's Page!</Text>
      <Image source={require('../assets/ani4k.jpg')} style={styles.artistImage} />
      <Text style={styles.artistBio}>
      Anirudh, is an Indian composer and playback singer who works primarily in Tamil cinema, in addition to Telugu and Hindi films. He has won two Filmfare Awards South, ten SIIMA Awards, six Edison Awards and five Vijay awards.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  artistImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  artistBio: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default Anirudh;
