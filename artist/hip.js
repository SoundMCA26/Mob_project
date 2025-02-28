import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HipHopTamizha = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to HipHopTamizha's Page!</Text>
      <Image source={require('../assets/adhi4k.jpg')} style={styles.artistImage} />
      <Text style={styles.artistBio}>
      Hiphop Tamizha is an Indian musical duo based in Chennai, Tamil Nadu. The duo consists of Rangadhithya "Adhi" Ramachandran Venkatapathy and R. Jeeva.[a]

Their commercial break-through came with the song "Club le Mabbu le" in 2011. In 2012, Hiphop Tamizha released their debut album Hip Hop Tamizhan, which is India's first Tamil hip hop album. It was a major success with both the general public and critics. While the duo were originally independent musicians, since 2013 they have contributed primarily to composing for films.
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

export default HipHopTamizha;
