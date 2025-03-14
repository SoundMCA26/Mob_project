import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const LogoSplashScreen = ({ onAnimationEnd }) => {
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const playVideo = async () => {
      try {
        await videoRef.current.playAsync();
        console.log("Video started");
      } catch (e) {
        console.warn("Video playback error:", e);
        onAnimationEnd && onAnimationEnd();
      }
    };

    playVideo();
  }, [onAnimationEnd]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('./assets/splash.mp4')}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded && videoDuration === 0) {
            setVideoDuration(status.durationMillis);
            console.log('Video duration:', status.durationMillis);
          }

          console.log('Playback Status:', status);

          // Check if the video has played to its full duration
          if (status.positionMillis >= videoDuration) {
            console.log('Video finished');
            onAnimationEnd && onAnimationEnd();
          }
        }}
        onError={(error) => console.error('Video error:', error)}
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

export default LogoSplashScreen;
