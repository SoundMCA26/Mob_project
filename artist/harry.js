import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// Example Artist Page: Harry Styles
const HarryStyles = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Welcome to Harry Styles's Page!</Text>
        <Image source={require('../assets/harry_4k.jpg')} style={styles.artistImage} />
        <Text style={styles.artistBio}>
          Harry Styles is a British singer, songwriter, and actor. He was a member of the band One Direction 
          before launching a successful solo career with his own albums. His music blends pop, rock, and folk elements, 
          and he is known for his unique style and stage presence.
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

export default HarryStyles;
