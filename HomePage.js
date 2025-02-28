import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomePage = ({ navigation }) => {
  const imageButtons = [
    { id: '1', name: 'Taylor Swift', image: require('./assets/Taylor4K.jpg'), artist: 'TaylorSwift' },
    { id: '2', name: 'Harry Styles', image: require('./assets/harry_4k.jpg'), artist: 'HarryStyles' },
    { id: '3', name: 'Anirudh', image: require('./assets/ani4k.jpg'), artist: 'Anirudh' },
    { id: '4', name: 'HipHopTamizha', image: require('./assets/adhi4k.jpg'), artist: 'HipHopTamizha' },
    { id: '5', name: 'Sabrina', image: require('./assets/sabrina4k.jpg'), artist: 'Sabrina' },
  ];
  const youtubePlayers = [
    { id: '1', name: 'Taylor Swift - You Belong With Me', videoId: 'VuNIsY6JdUw' },
    { id: '2', name: 'Harry Styles - As It Was', videoId: 'H5v3kku4y6Q' },
    { id: '3', name: 'Anirudh - Why This Kolaveri Di', videoId: 'YR12Z8f1Dh8' },
    { id: '4', name: 'Taylor Swift - Love Story', videoId: '8xg3vE8Ie_E' },
    { id: '5', name: 'Maroon 5 - Sugar', videoId: 'pRpeEdMmmQ0' },
  ];
  
  
  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.backgroundImage}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.topBarText}>99.3 Music</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}> Explore Artists </Text>

        <FlatList
          data={imageButtons}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.imageButton} onPress={() => navigation.navigate(item.artist)}>
              <Image source={item.image} style={styles.artistImage} />
              <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.spotifyContainer}>
          <WebView
            source={{ uri: 'https://open.spotify.com/embed/playlist/0XYnAcgZqmVOMcW8SMhkdb?utm_source=generator' }}
            style={styles.spotifyPlayer}
            javaScriptEnabled
            domStorageEnabled
            nestedScrollEnabled={true} 
            startInLoadingState
          />
        </View>

        <Text style={styles.subHeader}> YouTube Playlists </Text>
        <FlatList
          data={youtubePlayers}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <View style={styles.youtubeContainer}>
              
              <WebView
                source={{ uri: `https://www.youtube.com/embed/${item.videoId}?controls=1&modestbranding=1&rel=0` }}
                style={styles.youtubePlayer}
                javaScriptEnabled
                domStorageEnabled
                allowsFullscreenVideo
                startInLoadingState
                mediaPlaybackRequiresUserAction={false}
                userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
              />
              <Text style={styles.label}>{item.name}</Text>
            </View>
          )}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    backgroundColor: '#000',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#000',
  },
  iconButton: {
    padding: 5,
  },
  topBarText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 25,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  imageButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  artistImage: {
    width: 315,
    height: 150,
    borderRadius: 12,
  },
  label: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },
  spotifyContainer: {
    width: '90%',
    height: 360,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  spotifyPlayer: {
    flex: 1,
  },
  youtubeContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  youtubePlayer: {
    width: 315,
    height: 180,
    borderRadius: 12,
  },
});

export default HomePage;
