import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ImageBackground } from 'react-native';

const user = {
  profilePicture: require('./assets/profile.jpg'), // Offline profile picture
  backgroundImage: require('./assets/background.png'), // Offline background image
  username: 'Soundarya K',
  following: [
    { id: '1', name: 'Artist 1' },
    { id: '2', name: 'Artist 2' },
    { id: '3', name: 'Artist 3' },
  ],
};

const ProfilePage = () => {
  return (
    <ImageBackground source={user.backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}> 
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image source={user.profilePicture} style={styles.profileImage} />
          <Text style={styles.username}>{user.username}</Text>
        </View>

        {/* Grey Line Separator */}
        <View style={styles.separator} />

        {/* Following List */}
        <Text style={styles.sectionTitle}>Following</Text>
        <FlatList
          data={user.following}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text style={styles.artist}>{item.name}</Text>}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light overlay for readability
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    width: '100%',
  },
  profileContainer: {
    flexDirection: 'row', // Username next to the picture
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15, // Space between image and username
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: 'grey',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default ProfilePage;
