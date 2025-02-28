import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

const Sabrina = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      {/* Full-width transparent image with fade effect */}
      <Animated.View style={[styles.imageBackgroundContainer, { opacity: imageOpacity }]}>
        <Image source={require('../assets/sabrina.png')} style={styles.artistImage} />
      </Animated.View>

      {/* Fun and playful welcome header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>🎤✨ Hey there, Superstar! Welcome to Sabrina's World! ✨🎶</Text>
      </View>

      {/* Bio section with soft glassmorphism effect */}
      <View style={styles.bioContainer}>
        <Text style={styles.artistBio}>
          Sabrina Annlynn Carpenter (born May 11, 1999) is an American singer, songwriter, and actress. She gained prominence starring on the Disney Channel series Girl Meets World (2014–2017), and signed with the Disney-owned Hollywood Records. She released her debut single, "Can't Blame a Girl for Trying" in 2014, followed by the studio albums Eyes Wide Open (2015), Evolution (2016), Singular: Act I (2018), and Singular: Act II (2019).
        </Text>
      </View>

      {/* Spotify Embed with seamless rounded aesthetic */}
      <View style={styles.spotifyContainer}>
        <WebView
          source={{ uri: 'https://open.spotify.com/embed/artist/74KM79TiuVKeVCqs8QtB0B?utm_source=generator&theme=0' }}
          style={styles.spotifyPlayer}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#89cff0',
    alignItems: 'center',
    paddingVertical: 40,
  },
  imageBackgroundContainer: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 300,
    alignItems: 'center',
  },
  artistImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  headerContainer: {
    marginTop: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'BrushScriptMT-Regular',
    color: '#222',
  },
  bioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 20,
    width: '90%',
  },
  artistBio: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'BrushScriptMT-Regular',
    color: '#444',
  },
  spotifyContainer: {
    width: '90%',
    height: 352,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 25,
  },
  spotifyPlayer: {
    flex: 1,
  },
});

export default Sabrina;
