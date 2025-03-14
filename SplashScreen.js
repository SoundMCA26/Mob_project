import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 6000); // 3 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/splash.mp4')} // Update path as needed
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
