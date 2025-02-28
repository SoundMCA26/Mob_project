import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// Example Artist Page: Taylor Swift
const TaylorSwift = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Welcome to Taylor Swift's Page!</Text>
        <Image source={require('../assets/Taylor4K.jpg')} style={styles.artistImage} />
        <Text style={styles.artistBio}>
          Taylor Swift is an American singer-songwriter known for her narrative songwriting. 
          She has won numerous awards including Grammy Awards, and her albums are some of the best-selling of all time.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    lineHeight: 24, // Adjust line height for better readability
  },
});

export default TaylorSwift;
