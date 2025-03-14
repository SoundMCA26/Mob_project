import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ConcertPage from './ConcertPage';
import ProfilePage from './ProfilePage';
import LogoSplashScreen from './LogoSplashScreen';  // Splash screen component

// Artist Pages
import TaylorSwift from './artist/taylor';
import HarryStyles from './artist/harry';
import Anirudh from './artist/ani';
import HipHopTamizha from './artist/hip';
import Sabrina from './artist/sabrina';

// Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🎵 Bottom Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          Home: 'home',
          Concert: 'musical-notes',
          Profile: 'person',
        };
        return (
          <Ionicons
            name={focused ? icons[route.name] : `${icons[route.name]}-outline`}
            size={size}
            color={color}
          />
        );
      },
      tabBarActiveTintColor: '#c4d9ff',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#121212', paddingBottom: 5 },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Concert" component={ConcertPage} />
    <Tab.Screen name="Profile" component={ProfilePage} />
  </Tab.Navigator>
);

// 🚀 Main App Component with Splash Screen
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 6000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <LogoSplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            
            {/* Artist Pages */}
            <Stack.Screen name="TaylorSwift" component={TaylorSwift} />
            <Stack.Screen name="HarryStyles" component={HarryStyles} />
            <Stack.Screen name="Anirudh" component={Anirudh} />
            <Stack.Screen name="HipHopTamizha" component={HipHopTamizha} />
            <Stack.Screen name="Sabrina" component={Sabrina} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
